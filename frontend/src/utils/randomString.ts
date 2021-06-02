import crypto from "crypto";

export function randomString(length: number) {
  return crypto.randomBytes(length / 2).toString("hex");
}
