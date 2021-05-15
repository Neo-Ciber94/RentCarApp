import { SESSION_EXPIRATION } from "@shared/config";
import { err, ok, Result } from "@shared/result";
import { UserSignup, UserDTO, UserLogin } from "@shared/types";
import { Request } from "express";
import { User, UserSession } from "../entities";
import { BCryptHasher, PasswordHasher } from "../utils";

declare module "express-session" {
  interface Session {
    userId: number;
  }
}

export class AuthRepository {
  readonly hasher: PasswordHasher = new BCryptHasher();

  async signup(userSignup: UserSignup): Promise<Result<UserDTO, string>> {
    const exist = await User.findUserByEmail(userSignup.email);
    if (exist) {
      return err(`email already exist: ${userSignup.email}`);
    }

    const { hash, salt } = await this.hasher.hash(userSignup.password);

    const user = User.create(userSignup);
    user.hash = hash;
    user.salt = salt;

    const newUser = await User.save(user);
    return ok(newUser);
  }

  async login(
    userLogin: UserLogin,
    resquest: Request
  ): Promise<Result<UserDTO, string>> {
    const user = await User.findUserByEmail(userLogin.username);

    if (user) {
      const valid = await this.hasher.compare(user.hash, userLogin.password);
      if (valid) {
        // Stores the current user id
        resquest.session.userId = user.id;

        // The session must have an id at this point
        const userSession = await UserSession.findOne(resquest.session.id);
        userSession!.user = user;
        await UserSession.save(userSession!);

        resquest.session.save();

        return ok(user);
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

  async forceLogout(request: Request) {
    const userId = request.session.userId;

    if (userId) {
      const sessions = await UserSession.find({
        where: { userId },
      });

      await UserSession.remove(sessions);
    }
  }
}
