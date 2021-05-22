import { makeAutoObservable } from "mobx";
import { UserDTO, UserSignup } from "@shared/types";
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
    return webClient.post("/signup", userSignUp);
  }

  login() {
    this.user = {} as UserDTO;
  }

  logout() {
    this.user = null;
  }

  refresh() {}
}
