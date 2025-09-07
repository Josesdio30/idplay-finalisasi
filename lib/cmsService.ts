// API configuration and service
const BASE_URL = process.env.NEXT_PUBLIC_CMS_URL;
const API_URL = `${BASE_URL}/api`;

// Helper function to construct API URLs
export const getAPIURL = (path: string = ''): string => {
  return `${BASE_URL}${path}`;
};

// Helper function to fetch data from API
export const fetchAPI = async (path: string, options: RequestInit = {}): Promise<any> => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const requestUrl = `${API_URL}${path}`;
  
  // Debug logging
  // console.log('API Request:', requestUrl);

  try {
    const response = await fetch(requestUrl, mergedOptions);
    
    if (!response.ok) {
      console.error('API Error - Status:', response.status, 'URL:', requestUrl);
      throw new Error(`HTTP error! status: ${response.status} - URL: ${requestUrl}`);
    }
    
    const data = await response.json();
    // console.log('API Success:', requestUrl, 'Data:', data?.data?.length || 0, 'items');
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};