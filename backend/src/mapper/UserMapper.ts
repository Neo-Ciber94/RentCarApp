import { UserDTO } from "@shared/types";
import { User } from "src/entities";
import { Mapper } from "src/utils";

export class UserMapper extends Mapper<User, UserDTO> {
  map(entity: User): UserDTO {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      createdAt: entity.createdAt,
      documentId: entity.documentId,
      email: entity.email,
      role: entity.role,
      status: entity.status,
    };
  }
}
