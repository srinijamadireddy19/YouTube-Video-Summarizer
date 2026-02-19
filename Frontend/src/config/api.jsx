// API Configuration
// You can modify this file to change the API endpoint

const API_CONFIG = {
  // Base URL for the API
  // In development, this will use the proxy defined in package.json
  // In production, set this to your actual API URL
  BASE_URL: "https://you-tube-video-summarizer-khaki.vercel.app" ,
  
  // API Endpoints
  ENDPOINTS: {
    SUMMARISE: '/summarize',
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 30000, // 30 seconds
};


export default API_CONFIG;

