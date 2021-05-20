import { makeAutoObservable } from "mobx";
import { UserDTO, UserSignup } from "@shared/types";
import { Result } from "@shared/result";
import { webClient } from "./http";

export class AuthService {
  private static INSTANCE?: AuthService;
  #currentUser: UserDTO | null = null;

  constructor() {
    if (AuthService.INSTANCE) {
      return AuthService.INSTANCE;
    } else {
      AuthService.INSTANCE = makeAutoObservable(this);
    }
  }

  get currentUser() {
    return this.#currentUser;
  }

  signup(userSignUp: UserSignup): Promise<Result<UserDTO, string>> {
    return webClient.post("/signup", userSignUp);
  }

  login() {}

  logout() {}

  refresh() {}
}
