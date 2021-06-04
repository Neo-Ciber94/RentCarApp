import { UserRole, WorkShift } from "@shared/types";
import { Employee } from "src/entities";
import { AuthRepository, GenericRepository } from "src/repositories";
import { MigrationInterface } from "typeorm";

export class Seed1621089236963 implements MigrationInterface {
  public async up(): Promise<void> {
    const authRepository = new AuthRepository();
    const employeeRepository = new GenericRepository({
      repository: Employee.getRepository(),
    });

    // Boostrap with an admin user
    const result = await authRepository.signupWithRole({
      firstName: "Admin",
      lastName: "Admin",
      documentId: "0123456789",
      email: "admin@admin.com",
      password: "123456",
      role: UserRole.Admin,
    });

    await employeeRepository.create({
      user: result.get(),
      comissionPercentage: 0,
      workShift: WorkShift.Morning,
    });
  }

  public async down(): Promise<void> {}
}
