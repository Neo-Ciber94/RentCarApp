import { PUBLIC_IMAGES_URL } from "@shared/config";

const PLACEHOLDER_IMAGE =
  process.env.PUBLIC_URL + "/images/placeholder-vehicle.png";

export function getImage(path: string) {
  return `${PUBLIC_IMAGES_URL}/${path}`;
}

export function getImageOrDefault(path?: string) {
  if (path) {
    return getImage(path);
  }

  return PLACEHOLDER_IMAGE;
}
