export const codespaceName = process.env.CODESPACE_NAME;
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
export const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
