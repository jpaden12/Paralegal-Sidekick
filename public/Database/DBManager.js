import Database from "better-sqlite3";

// main.js resolves the persistent (userData) database path and passes it
// down via additionalArguments, since the `electron` app module (and
// app.getPath) isn't available in the preload/renderer process.
const dbPathArg = process.argv.find((arg) => arg.startsWith('--db-path='));
const dbPath = dbPathArg ? dbPathArg.slice('--db-path='.length) : './profiles.db';

export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS client_profiles (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    date_of_birth TEXT,
    address TEXT,
    gender TEXT,
    medical_provider_name TEXT,
    medical_provider_address TEXT
  )
`);
