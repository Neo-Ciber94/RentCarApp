import { makeAutoObservable, runInAction } from "mobx";
import {
  UserChangePassword,
  UserDTO,
  UserLogin,
  UserSignup,
  UserUpdate,
} from "@shared/types";
import { Result } from "@shared/result";
import { webClient } from "./http";

export class AuthService {
  private user: UserDTO | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get currentUser() {
    return this.user;
  }

  get isLogged() {
    return this.user != null;
  }

  async signup(userSignUp: UserSignup): Promise<Result<UserDTO, string>> {
    return webClient.post("/auth/signup", userSignUp);
  }

  async login(userLogin: UserLogin): Promise<Result<UserDTO, string>> {
    const result = await webClient.post<Result<UserDTO, string>, UserLogin>(
      "/auth/login",
      userLogin
    );

    runInAction(() => {
      if (result.isOk) {
        this.user = result.get();
        console.log(result);
      }
    });

    return result;
  }

  async logout(): Promise<Result<void, string>> {
    const result = await webClient.post<Result<void, string>>("/auth/logout");
    runInAction(() => {
      this.user = null;
    });
    return result;
  }

  async update(userUpdate: UserUpdate): Promise<Result<UserDTO, string>> {
    const result = await webClient.put<Result<UserDTO, string>, UserUpdate>(
      "/auth/update",
      userUpdate
    );

    if (result.isOk) {
      const newUser = result.get();

      // Only update the current user if the id's match
      if (newUser.id === this.user?.id) {
        this.user = newUser;
      }
    }

    return result;
  }

  async changePassword(
    changePassword: UserChangePassword
  ): Promise<Result<void, string>> {
    return webClient.put("/auth/changepassword", changePassword);
  }

  async forceLogout(self: boolean): Promise<void> {
    const result = await webClient.post<void>("/auth/forcelogout");

    if (self) {
      this.user = null;
    }

    return result;
  }

  async refresh() {
    const user = await webClient.get<UserDTO | undefined>("/auth/user");

    runInAction(() => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });

    return user;
  }
}
