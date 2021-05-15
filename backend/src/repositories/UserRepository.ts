import { User } from "src/entities";

export class UserRepository {
  async getAll(): Promise<User[]> {
    return User.find();
  }

  async getById(id: number): Promise<User | undefined> {
    return User.findOne(id);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return User.findUserByEmail(email);
  }
}
