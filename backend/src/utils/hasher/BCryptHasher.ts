import { HashResult, PasswordHasher } from "./PasswordHasher";
import bcrypt from "bcrypt";

export class BCryptHasher extends PasswordHasher {
  async hash(password: string): Promise<HashResult> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return { salt, hash };
  }

  compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
