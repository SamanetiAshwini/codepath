import { createApp } from './app.js';
import { config } from './config/env.js';

const app = createApp();

app.listen(config.port, () => {
  console.log(`=======================================================`);
  console.log(`🚀 CODEPATH API SERVER ONLINE`);
  console.log(`📡 URL: http://localhost:${config.port}`);
  console.log(`🌱 Environment: ${config.nodeEnv}`);
  console.log(`🔐 Auth: Supabase Auth & JWT Enabled`);
  console.log(`💻 Code Execution: Safe Sandbox Engine (Judge0 Capable)`);
  console.log(`=======================================================`);
});
