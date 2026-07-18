import { db } from '@/database/db';
import { settingsStore } from '../storage/settingsStore';
import { validateBackupData } from '../validators/validateBackup';
import { BackupData, SerializedResume, SerializedCertificate } from '../types/backup';

// Helper to convert Blob to Base64
async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.substring(result.indexOf(',') + 1);
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Helper to convert Base64 back to Blob
function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

export const backupService = {
  /**
   * Generates a complete backup data payload (excluding API keys).
   */
  exportBackup: async (): Promise<BackupData> => {
    // 1. Fetch Dexie records
    const resumes = await db.resumes.toArray();
    const parsedResumes = await db.parsedResumes.toArray();
    const certificates = await db.certificates.toArray();
    const links = await db.links.toArray();
    const mails = await db.mails.toArray();
    const carts = await db.cart.toArray();

    // 2. Serialize binary files in resumes to Base64
    const serializedResumes: SerializedResume[] = await Promise.all(
      resumes.map(async (r) => {
        const fileBase64 = await blobToBase64(r.file);
        return {
          id: r.id,
          fileName: r.fileName,
          uploadedAt: r.uploadedAt,
          updatedAt: r.updatedAt,
          title: r.title,
          file: {
            fileName: r.fileName,
            fileSize: r.fileSize,
            mimeType: 'application/pdf',
            fileBase64
          }
        };
      })
    );

    // 3. Serialize binary files in certificates to Base64
    const serializedCertificates: SerializedCertificate[] = await Promise.all(
      certificates.map(async (c) => {
        const fileBase64 = await blobToBase64(c.file);
        return {
          id: c.id,
          fileName: c.fileName,
          mimeType: c.mimeType,
          uploadedAt: c.uploadedAt,
          updatedAt: c.updatedAt,
          metadata: c.metadata,
          file: {
            fileName: c.fileName,
            fileSize: c.file.size,
            mimeType: c.mimeType,
            fileBase64
          }
        };
      })
    );

    // 4. Fetch settings preferences (excluding api key)
    const settings = await settingsStore.getSettings();

    const backup: BackupData = {
      metadata: {
        version: '1.0',
        exportedAt: Date.now(),
        app: 'Lative'
      },
      database: {
        resumes: serializedResumes,
        parsedResumes,
        certificates: serializedCertificates,
        links,
        mails,
        carts
      },
      settings: {
        theme: settings.theme,
        floatingButtonEnabled: settings.floatingButtonEnabled
      }
    };

    return backup;
  },

  /**
   * Restores database and configuration settings from a Lative backup.
   */
  restoreBackup: async (backupData: unknown): Promise<void> => {
    // 1. Run verification checks
    const validation = validateBackupData(backupData);
    if (!validation.isValid) {
      throw new Error(validation.error || 'Backup validation failed.');
    }

    const backup = backupData as BackupData;

    // 2. Perform restore mutations inside a global transaction
    await db.transaction('rw', [
      db.resumes,
      db.parsedResumes,
      db.certificates,
      db.links,
      db.mails,
      db.cart
    ], async () => {
      // Clear current records
      await Promise.all([
        db.resumes.clear(),
        db.parsedResumes.clear(),
        db.certificates.clear(),
        db.links.clear(),
        db.mails.clear(),
        db.cart.clear()
      ]);

      // Restore links, mails, carts
      if (backup.database.links.length > 0) await db.links.bulkAdd(backup.database.links);
      if (backup.database.mails.length > 0) await db.mails.bulkAdd(backup.database.mails);
      if (backup.database.carts.length > 0) await db.cart.bulkAdd(backup.database.carts);

      // Restore parsedResumes
      if (backup.database.parsedResumes.length > 0) {
        await db.parsedResumes.bulkAdd(backup.database.parsedResumes);
      }

      // Restore resumes (Base64 -> Blobs)
      for (const res of backup.database.resumes) {
        const fileBlob = base64ToBlob(res.file.fileBase64, res.file.mimeType);
        await db.resumes.add({
          id: res.id,
          fileName: res.fileName,
          file: fileBlob,
          fileSize: res.file.fileSize,
          uploadedAt: res.uploadedAt,
          updatedAt: res.updatedAt,
          title: res.title
        });
      }

      // Restore certificates (Base64 -> Blobs)
      for (const cert of backup.database.certificates) {
        const fileBlob = base64ToBlob(cert.file.fileBase64, cert.file.mimeType);
        await db.certificates.add({
          id: cert.id,
          fileName: cert.fileName,
          file: fileBlob,
          mimeType: cert.mimeType,
          uploadedAt: cert.uploadedAt,
          updatedAt: cert.updatedAt,
          metadata: cert.metadata
        });
      }
    });

    // 3. Restore user settings preferences (keeping existing apiKey)
    if (backup.settings.theme) {
      await settingsStore.setTheme(backup.settings.theme);
    }
    if (backup.settings.floatingButtonEnabled !== undefined) {
      await settingsStore.setFloatingButtonEnabled(backup.settings.floatingButtonEnabled);
    }
  }
};
export default backupService;
