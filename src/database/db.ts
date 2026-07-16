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
}

export const db = new LativeDatabase();
