import {
  UserChangePassword,
  UserLogin,
  UserRole,
  UserSignup,
  UserUpdate,
} from "@shared/types";
import { Request } from "express";
import {
  Authorized,
  Body,
  Get,
  JsonController,
  OnUndefined,
  Post,
  Put,
  Req,
} from "routing-controllers";
import { AuthRepository } from "src/repositories";

@JsonController("/auth")
export class AuthController {
  private repository = new AuthRepository();

  @Post("/signup")
  @Authorized(UserRole.Admin)
  async signup(@Body() userSignup: UserSignup) {
    return this.repository.signup(userSignup);
  }

  @Post("/login")
  async login(@Body() userLogin: UserLogin, @Req() request: Request) {
    return this.repository.login(userLogin, request);
  }

  @Post("/logout")
  async logout(@Req() request: Request) {
    return this.repository.logout(request);
  }

  @Put("/update")
  async update(@Body() userUpdate: UserUpdate) {
    return this.repository.update(userUpdate);
  }

  @Put("/changepassword")
  async changePassword(@Body() userChangePassword: UserChangePassword) {
    return this.repository.changePassword(userChangePassword);
  }

  @Post("/forcelogout")
  async forceLogout(@Req() request: Request) {
    return this.repository.forceLogout(request);
  }

  @Get("/user")
  @OnUndefined(200)
  async getUser(@Req() request: Request) {
    return this.repository.getUser(request);
  }
}
