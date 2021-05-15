import { UserRole } from "@shared/types";
import "express-session";

declare module "express-session" {
  interface Session {
    userId: number;
    role: UserRole;
  }
}
