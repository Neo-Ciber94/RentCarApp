import {
  UserChangePassword,
  UserLogin,
  UserRole,
  UserSignup,
  UserUpdate,
} from "@shared/types";
import { Request, response, Response } from "express";
import {
  Authorized,
  Body,
  Get,
  JsonController,
  OnUndefined,
  Post,
  Put,
  Req,
  Res,
} from "routing-controllers";
import { AuthRepository } from "src/repositories";

@JsonController("/auth")
export class AuthController {
  private repository = new AuthRepository();

  @Post("/signup")
  @Authorized(UserRole.Admin)
  async signup(@Body() userSignup: UserSignup, @Res() response: Response) {
    return this.repository.signup(userSignup).catch((err) => {
      console.error(err);
      return response!.sendStatus(500);
    });
  }

  @Post("/login")
  async login(
    @Body() userLogin: UserLogin,
    @Req() request: Request,
    @Res() response: Response
  ) {
    return this.repository.login(userLogin, request).catch((err) => {
      console.error(err);
      return response!.sendStatus(500);
    });
  }

  @Post("/logout")
  async logout(@Req() request: Request, @Res() response: Response) {
    return this.repository.logout(request).catch((err) => {
      console.error(err);
      return response!.sendStatus(500);
    });
  }

  @Put("/update")
  async update(@Body() userUpdate: UserUpdate, @Res() response: Response) {
    return this.repository.update(userUpdate).catch((err) => {
      console.error(err);
      return response!.sendStatus(500);
    });
  }

  @Put("/changepassword")
  async changePassword(@Body() userChangePassword: UserChangePassword) {
    return this.repository.changePassword(userChangePassword).catch((err) => {
      console.error(err);
      return response!.sendStatus(500);
    });
  }

  @Post("/forcelogout")
  async forceLogout(@Req() request: Request, @Res() response: Response) {
    return this.repository.forceLogout(request).catch((err) => {
      console.error(err);
      return response!.sendStatus(500);
    });
  }

  @Get("/user")
  @OnUndefined(200)
  async getUser(@Req() request: Request) {
    return this.repository.getUser(request).catch((err) => {
      console.error(err);
      return response!.sendStatus(500);
    });
  }
}
