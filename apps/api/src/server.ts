import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`[API] Unified Workspace API listening on http://localhost:${PORT}`);
  console.log(`[API] Health check available at http://localhost:${PORT}/health`);
});
