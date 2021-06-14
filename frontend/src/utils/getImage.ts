import { PUBLIC_IMAGES_URL } from "@shared/config";

export function getImage(path: string) {
  return `${PUBLIC_IMAGES_URL}/${path}`;
}
