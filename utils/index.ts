export * from "./cn";
export * from "./local-storage";
export * from "./session-storage";

export const PAGINATION = { PAGE_LIMIT: 10 };

export const DATE_TIME_FORMATS = {
  DD_MM_YYYY_FORWARD_SLASH: "DD/MM/YYYY",
  D: "D",
  MMMM: "MMMM",
};

export const MAX_FILES_SIZE = {
  GLOBAL_MAX_SIZE: 10 * 1024 * 1024,
};

export const pxToRem = (px: number) => `${px / 16}rem`;

export const getThemeColor = (theme: any, color: string) => color;

export type DayjsI = any;

export const formatToDate = (date: any) => {
  if (!date) return null;
  if (date instanceof Date) return date;
  if (typeof date === "string") return new Date(date);
  if (date?.toDate) return date.toDate();
  return new Date(date);
};

export const generateDate = (date: any) => {
  if (!date) return null;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const dayjs = require("dayjs");
  return dayjs(date);
};

export const getDayOfWeek = (date: any): number => {
  if (!date) return 0;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const dayjs = require("dayjs");
  return dayjs(date).day();
};

export const nowDate = () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const dayjs = require("dayjs");
  return dayjs();
};

export const otherDateFormat = (date: any, format: string): string => {
  if (!date) return "";
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const dayjs = require("dayjs");
  return dayjs(date).format(format);
};

export const errorSnackbar = (message: string) => {
  console.error(message);
};

/** Convert a backend-relative image path (/uploads/…) to a full URL */
export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
  return `${base}${path}`;
}
