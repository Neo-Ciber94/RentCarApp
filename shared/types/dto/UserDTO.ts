import { UserRole } from "../UserRole";
import { UserStatus } from "../UserStatus";

export interface UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  documentId: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
}
