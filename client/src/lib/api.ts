// API base URL configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Helper function to build API URLs
export function apiUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // For absolute paths (starting with http), return as-is
  if (cleanPath.startsWith('http')) {
    return cleanPath;
  }
  
  // For production, use full URL from env var
  if (API_BASE_URL) {
    return `${API_BASE_URL}/${cleanPath}`;
  }
  
  // For development, use relative path (will be proxied by Vite)
  return `/${cleanPath}`;
}