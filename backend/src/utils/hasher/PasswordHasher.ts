export interface HashResult {
  salt: string;
  hash: string;
}

export abstract class PasswordHasher {
  abstract hash(password: string): HashResult | Promise<HashResult>;
  abstract compare(
    password: string,
    hashedPassword: string
  ): boolean | Promise<boolean>;
}
