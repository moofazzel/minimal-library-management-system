// API Configuration for different environments
const getApiBaseUrl = () => {
  // Check if we're in production (Vercel)
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost"
  ) {
    // Use the production API URL
    return "https://phl-2-assignment-03-5vy5.vercel.app/api";
  }

  // Development - use proxy
  return "/api";
};

export const API_BASE_URL = getApiBaseUrl();
