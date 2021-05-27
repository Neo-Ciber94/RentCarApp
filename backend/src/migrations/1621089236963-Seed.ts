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
      documentId: "1234",
      email: "admin@admin.com",
      password: "0123456789",
      role: UserRole.Admin,
    });
  }

  public async down(): Promise<void> {}
}
