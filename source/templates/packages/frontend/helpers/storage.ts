export const setStorage = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

export const getStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
}

export const resetAccessTokens = () => {
  localStorage.removeItem('access_token');
  // For legacy users who already logged in with old api /mobile-auth/signup/
  localStorage.removeItem('authToken');
};
