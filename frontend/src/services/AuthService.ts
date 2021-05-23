import { makeAutoObservable } from "mobx";
import { UserDTO, UserLogin, UserSignup } from "@shared/types";
import { Result } from "@shared/result";
import { webClient } from "./http";

export class AuthService {
  private static INSTANCE?: AuthService;
  private user: UserDTO | null = null;

  constructor() {
    if (AuthService.INSTANCE) {
      return AuthService.INSTANCE;
    } else {
      AuthService.INSTANCE = makeAutoObservable(this);
    }
  }

  get currentUser() {
    return this.user;
  }

  get isLogged() {
    return this.user != null;
  }

  signup(userSignUp: UserSignup): Promise<Result<UserDTO, string>> {
    return webClient.post("/auth/signup", userSignUp);
  }

  async login(userLogin: UserLogin): Promise<Result<UserDTO, string>> {
    const result = await webClient.post<Result<UserDTO, string>, UserLogin>(
      "/auth/login",
      userLogin
    );

    if (result.isOk) {
      this.user = result.get();
    }

    return result;
  }

  async logout(): Promise<Result<void, string>> {
    const result = await webClient.post<Result<void, string>>("/auth/logout");
    this.user = null;
    return result;
  }

  async refresh() {
    const result = await webClient.get<UserDTO>("/auth/user");

    if (result) {
      this.user = result;
    }
  }
}
