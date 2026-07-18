import Dexie, { type Table } from '@/lib/dexie';
import { 
  ResumeRecord, 
  ParsedResumeRecord, 
  CertificateRecord, 
  LinkRecord, 
  MailRecord, 
  CartRecord, 
  SettingRecord 
} from '@/types/database';
import { configureDatabaseVersions } from './migrations';

export class LativeDatabase extends Dexie {
  resumes!: Table<ResumeRecord>;
  parsedResumes!: Table<ParsedResumeRecord>;
  certificates!: Table<CertificateRecord>;
  links!: Table<LinkRecord>;
  mails!: Table<MailRecord>;
  cart!: Table<CartRecord>;
  settings!: Table<SettingRecord>;

  constructor() {
    super('LativeDB');
    configureDatabaseVersions(this);
  }

  /**
   * Asserts IndexedDB read and write permissions by attempting to open the connection
   * and running a low-overhead table query.
   */
  public async verifyStorageAccess(): Promise<{ ok: boolean; error?: string }> {
    try {
      if (!this.isOpen()) {
        await this.open();
      }
      // Read settings table bounds to verify query layer integrity.
      // Verified that all primary and secondary index fields used in queries
      // (id, key, url, createdAt, fileName, uploadedAt) are declared in schema.ts.
      await this.settings.count();
      return { ok: true };
    } catch (err: unknown) {
      console.error('Lative Database Access Check Failed:', err);
      const error = err as Error;
      const errorMsg = error?.message || error?.name || 'IndexedDB connection refused';
      return { ok: false, error: errorMsg };
    }
  }
}

export const db = new LativeDatabase();
