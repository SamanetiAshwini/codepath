import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'codepath_jwt_secret_dev_key_2025_placement_ready',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  databaseUrl: process.env.DATABASE_URL || '',
  judge0ApiKey: process.env.JUDGE0_API_KEY || '',
  judge0Host: process.env.JUDGE0_HOST || 'https://judge0-ce.p.rapidapi.com',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  openaiApiKey: process.env.OPENAI_API_KEY || ''
};
