export const getLocalStorage = (key: string) => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
};

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearLocalStorage = () => {
  if (typeof window === "undefined") return;
  localStorage.clear();
};

export const removeAuthToken = (key: string) => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};
