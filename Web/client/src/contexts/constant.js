const serverUrl = (import.meta.env.VITE_SERVER_URL || 'http://localhost:5000').replace(/\/$/, '');
export const apiUrl = serverUrl + '/api';
export const SUBTITLE_FILE_API = serverUrl + '/videos';
export const LOCAL_STORAGE_TOKEN_NAME = 'video';
