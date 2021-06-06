import crypto from "crypto";

export class RandomString {
  private constructor() {}

  static hex(length: number) {
    return crypto.randomBytes(length / 2).toString("hex");
  }

  static number(length: number) {
    let result = "";

    while (length > 0) {
      result += Math.floor(randomRange(0, 10));
      length -= 1;
    }

    return result;
  }
}

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
