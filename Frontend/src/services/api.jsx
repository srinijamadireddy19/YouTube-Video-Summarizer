import API_CONFIG from '../config/api';

/**
 * Makes a POST request to summarize a YouTube video
 * @param {string} videoUrl - The YouTube video URL to summarize
 * @returns {Promise<Object>} The API response containing the summary
 */
export const summarizeVideo = async (videoUrl) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUMMARISE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoUrl }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Try to parse error message from response
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // If we can't parse the error, use the default message
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // Validate response has summary
    if (!data.summary) {
      throw new Error('No summary returned from server');
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - Please try again');
    }
    
    throw error;
  }
};

/**
 * Validates if a URL is a valid YouTube URL
 * @param {string} url - The URL to validate
 * @returns {boolean} True if valid YouTube URL
 */
export const isValidYouTubeUrl = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return youtubeRegex.test(url);
};