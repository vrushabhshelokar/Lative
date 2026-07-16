import Dexie from '@/lib/dexie';
import { dbSchema } from './schema';

/**
 * Configure database versions and run migrations.
 * This separates version upgrades and data migration logic from the core DB class declaration.
 */
export const configureDatabaseVersions = (db: Dexie): void => {
  // Version 1: Initial schema setup
  db.version(1).stores(dbSchema);

  // Future version migrations can be appended here:
  // db.version(2).stores({ ... }).upgrade(async (tx) => { ... });
};
