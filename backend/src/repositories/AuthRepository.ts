import { err, ok, Result } from "@shared/result";
import { validatePassword } from "@shared/utils";
import {
  UserSignup,
  UserDTO,
  UserLogin,
  UserUpdate,
  UserChangePassword,
  UserRole,
} from "@shared/types";
import { Request } from "express";
import { User, UserSession } from "../entities";
import { BCryptHasher, PasswordHasher } from "../utils";
import { resolve } from "path";
import { UserMapper } from "src/mapper/UserMapper";

export class AuthRepository {
  private mapper = new UserMapper();
  readonly hasher: PasswordHasher = new BCryptHasher();

  // @internal
  async signupWithRole(
    userSignup: UserSignup & { role?: UserRole }
  ): Promise<Result<User, string>> {
    const exist = await User.findUserByEmail(userSignup.email);
    if (exist) {
      return err(`email already exist: ${userSignup.email}`);
    }

    const passwordValid = validatePassword(userSignup.password);
    if (passwordValid.isError) {
      return passwordValid.asError();
    }

    const { hash, salt } = await this.hasher.hash(userSignup.password);

    const user = User.create(userSignup);
    if (userSignup.role) {
      user.role = userSignup.role;
    }

    user.hash = hash;
    user.salt = salt;

    const newUser = await User.save(user);
    return ok(newUser);
  }

  async signup(userSignup: UserSignup): Promise<Result<UserDTO, string>> {
    const result = await this.signupWithRole(userSignup);
    return result.map((user) => this.mapper.map(user));
  }

  async login(
    userLogin: UserLogin,
    request: Request
  ): Promise<Result<UserDTO, string>> {
    const user = await User.findUserByEmail(userLogin.email);

    if (user) {
      const valid = await this.hasher.compare(userLogin.password, user.hash);

      if (valid) {
        // Stores the current user id and role
        request.session.userId = user.id;
        request.session.role = user.role;

        // Saves the session with the user id, and store the user in the session
        return new Promise<Result<UserDTO, string>>((resolve, reject) => {
          request.session.save(async (err) => {
            if (err) {
              reject(err);
            } else {
              // The session must have an id at this point
              const userSession = await UserSession.findOne({
                where: { id: request.sessionID },
              });
              userSession!.user = user;
              await UserSession.save(userSession!);

              const userDTO = this.mapper.map(user);
              resolve(ok(userDTO));
            }
          });
        });
      }
    }

    return err("invalid email or password");
  }

  async logout(request: Request): Promise<Result<void, string>> {
    if (request.session) {
      return new Promise<Result<void, string>>((resolve) => {
        request.session.destroy((err) => {
          if (err) {
            resolve(err(`Error during logout: ${err}`));
          } else {
            resolve(ok(undefined));
          }
        });
      });
    } else {
      return err("User is already logout");
    }
  }

  async update(userUpdate: UserUpdate): Promise<Result<UserDTO, string>> {
    const user = await User.findUserByEmail(userUpdate.email);

    if (user) {
      const newUser = User.create({
        ...user,
        ...userUpdate,
      });

      const updatedUser = await User.save(newUser);
      const userDTO = this.mapper.map(updatedUser);
      return ok(userDTO);
    } else {
      return err(`Cannot find the user with email: ${userUpdate.email}`);
    }
  }

  async changePassword(
    userChangePassword: UserChangePassword
  ): Promise<Result<void, string>> {
    const user = await User.findUserByEmail(userChangePassword.email);

    if (user) {
      const passwordValid = validatePassword(userChangePassword.newPassword);
      if (passwordValid.isError) {
        return passwordValid.asError();
      }

      const valid = await this.hasher.compare(
        userChangePassword.oldPassword,
        user.hash
      );

      if (valid) {
        const { hash, salt } = await this.hasher.hash(
          userChangePassword.newPassword
        );

        user.hash = hash;
        user.salt = salt;
        await User.save(user);
        return ok(undefined);
      } else {
        return err("password missmatch");
      }
    } else {
      return err(
        `Cannot find the user with email: ${userChangePassword.email}`
      );
    }
  }

  async forceLogout(request: Request) {
    const userId = request.session.userId;

    if (userId) {
      const sessions = await UserSession.find({
        where: { userId },
      });

      await UserSession.remove(sessions);
    }
  }

  async getUser(request: Request) {
    const userId = request.session.userId;

    if (userId) {
      const user = await User.findOne(userId);
      if (user) {
        return this.mapper.map(user);
      }
    }

    return undefined;
  }
}
