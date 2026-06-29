export const getSessionStorage = (key: string) => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(sessionStorage.getItem(key) || "null");
  } catch {
    return null;
  }
};

export const setSessionStorage = (key: string, value: any) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const removeSessionStorage = (key: string) => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(key);
};
