export const CODESPACE_NAME = process.env.CODESPACE_NAME;
export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
