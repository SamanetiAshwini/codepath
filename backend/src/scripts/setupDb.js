import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { config } from '../config/env.js';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  const connectionString = config.databaseUrl || process.env.DATABASE_URL;

  if (!connectionString) {
    console.log('ℹ️ No DATABASE_URL specified in environment.');
    console.log('ℹ️ CodePath runs out-of-the-box with its built-in in-memory seeded store for instant dev & testing.');
    console.log('ℹ️ To migrate to a live PostgreSQL or Supabase instance, set DATABASE_URL and run `npm run db:migrate`.');
    return;
  }

  console.log('🔄 Connecting to PostgreSQL / Supabase...');
  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const schemaPath = path.join(__dirname, '../data/schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('📦 Executing schema.sql migration...');
    await pool.query(sql);
    console.log('✅ PostgreSQL Schema successfully created!');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
  } finally {
    await pool.end();
  }
}

runMigration();
