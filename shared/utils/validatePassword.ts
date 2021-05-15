import { Result } from "..";
import { err, ok } from "../result";
import { MIN_PASSWORD_LENGTH } from "../config/config";

// Any ASCII from `33` to `126`
const asciiRegex = /^[!-~]*$/;
const whitespaceRegex = /\s/;

export function validatePassword(password: string): Result<void, string> {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return err(
      `Invalid password length, expected at least: ${MIN_PASSWORD_LENGTH} characters`
    );
  }

  if (whitespaceRegex.test(password)) {
    return err("Password cannot contains whitespaces");
  }

  if (!asciiRegex.test(password)) {
    return err(
      "Password can only contains letters (A-Z), numbers (0-9) and symbols"
    );
  }

  return ok(undefined);
}
