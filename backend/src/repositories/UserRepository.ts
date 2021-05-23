import { UserDTO } from "@shared/types";
import { User } from "src/entities";
import { UserMapper } from "src/mapper/UserMapper";

export class UserRepository {
  private mapper = new UserMapper();

  async getAll(): Promise<UserDTO[]> {
    return User.find().then((result) => this.mapper.mapMany(result));
  }

  async getById(id: number): Promise<UserDTO | undefined> {
    const result = await User.findOne(id);

    if (result) {
      return this.mapper.map(result);
    }

    // undefined
    return result;
  }

  async getByEmail(email: string): Promise<UserDTO | undefined> {
    const result = await User.findUserByEmail(email);

    if (result) {
      return this.mapper.map(result);
    }

    // undefined
    return result;
  }
}
