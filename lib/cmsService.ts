const getBaseUrl = () => {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return process.env.CMS_URL;
  }
  if (typeof window !== 'undefined') return '';
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
};

export const fetchAPI = async (path: string): Promise<any> => {
  const baseUrl = getBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const requestPath = process.env.NEXT_PHASE === 'phase-production-build' ? `/api${normalizedPath}` : `/api/cms${normalizedPath}`;
  // console.log('Fetching from:', `${baseUrl}${requestPath}`); // Debug
  const response = await fetch(`${baseUrl}${requestPath}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};