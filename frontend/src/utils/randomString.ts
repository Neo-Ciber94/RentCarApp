import crypto from "crypto";

export class RandomString {
  private constructor() {}

  static hex(length: number) {
    return crypto.randomBytes(length / 2).toString("hex");
  }

  static number(length: number) {
    return crypto.randomBytes(length).toString();
  }
}
