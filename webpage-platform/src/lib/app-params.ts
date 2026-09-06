export interface AppConfig {
  apiUrl: string;
  googleDriveFolderId: string;
  // FUTURE: firebaseApiKey: string;
}

const getConfig = (): AppConfig => {
  return {
    apiUrl:  "http://localhost:8000", // import.meta.env.VITE_API_BASE_URL ||
    googleDriveFolderId: "", // import.meta.env.VITE_DRIVE_FOLDER_ID || 
  };
};

export const config = getConfig();