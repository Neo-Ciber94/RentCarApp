export const MIN_PASSWORD_LENGTH = 6;
export const DOCUMENT_ID_LENGTH = 10;
export const CREDIT_CARD_LENGTH = 16;

export const DOCUMENT_ID_REGEX = new RegExp(`[0-9]${DOCUMENT_ID_LENGTH}`);
export const CREDIT_CARD_REGEX = new RegExp(`[0-9]${CREDIT_CARD_LENGTH}`);
export const PUBLIC_URL = "http://localhost:8000/public";
export const PUBLIC_IMAGES_URL = `${PUBLIC_URL}/images`;
