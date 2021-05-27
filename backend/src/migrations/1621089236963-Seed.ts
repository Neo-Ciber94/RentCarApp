import { UserRole } from "@shared/types";
import { AuthRepository } from "src/repositories";
import { MigrationInterface } from "typeorm";

export class Seed1621089236963 implements MigrationInterface {
  public async up(): Promise<void> {
    const repository = new AuthRepository();

    // Boostrapt with an admin user
    await repository.signupWithRole({
      firstName: "Admin",
      lastName: "Admin",
      documentId: "0123456789",
      email: "admin@admin.com",
      password: "123456",
      role: UserRole.Admin,
    });
  }

  public async down(): Promise<void> {}
}
