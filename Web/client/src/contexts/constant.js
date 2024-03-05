export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000/api'
		: 'URLPUBLIC';

export const LOCAL_STORAGE_TOKEN_NAME = 'video'
export const SUBTITLE_FILE_API = 'http://localhost:5000/videos'