import path from "path";

// prettier-ignore
export const SESSION_SECRET = process.env.SESSION_SECRECT || "df9fd16e8f5e5db315d7e98d570549033c5e6e64";
export const SESSION_EXPIRATION = 1000 * 60 * 60 * 24; // 1 day
export const BASE_API = "/api";
export const ROUTINE_INVERVAL = 1000 * 60; // 1 min

// public path
export const PUBLIC_PATH = path.join(__dirname, "../../public");
export const IMAGES_PATH = path.join(PUBLIC_PATH, "/images");
