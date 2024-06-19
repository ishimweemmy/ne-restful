import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAuthorizationHeader = () => {
  const currentUser = Cookies.get("currentUser");

  return {
    Authorization: `Bearer ${JSON.parse(currentUser || "")?.accessToken || ""}`,
  };
};

export const setAuthorizationToken = (token: string, type: string) =>
  Cookies.set(
    "currentUser",
    JSON.stringify({ [`${type.toLowerCase()}Token`]: token }),
  );

const parseJwt = (token: string): Record<string, any> | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return null;
  }
};

export const isTokenExpired = (
  currentUserCookie: string | undefined,
  expirationTimeBuffer: number = 5,
): boolean => {
  try {
    if (!currentUserCookie) {
      return true;
    }

    const currentUser = currentUserCookie
      ? JSON.parse(currentUserCookie)
      : null;

    const token = currentUser?.accessToken;

    if (!token) return true;

    const decodedToken = parseJwt(token);

    if (!decodedToken || !decodedToken.exp) return true;

    return Date.now() >= (decodedToken.exp - expirationTimeBuffer) * 1000;
  } catch (error) {
    console.error("Error parsing currentUser cookie:", error);
    return true;
  }
};

export const isAuthenticated = () => {
  const token = Cookies.get("currentUser");
  const expired = token ? isTokenExpired(token) : true;
  return !expired;
};
