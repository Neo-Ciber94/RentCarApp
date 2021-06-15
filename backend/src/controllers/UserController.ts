import { Response } from "express";
import {
  Get,
  JsonController,
  Param,
  QueryParam,
  Res,
} from "routing-controllers";
import { UserRepository } from "src/repositories";
import { handleError } from "./handleError";

@JsonController("/users")
export class UserController {
  private repository = new UserRepository();

  @Get()
  async findUser(
    @QueryParam("email") email?: string,
    @Res() response?: Response
  ) {
    try {
      if (email) {
        return await this.repository.getByEmail(email);
      }

      return await this.repository.getAll();
    } catch (error) {
      return handleError(error, response!);
    }
  }

  @Get("/:id")
  async findUserById(@Param("id") id: number, @Res() response?: Response) {
    return await this.repository
      .getById(id)
      .catch((error) => handleError(error, response!));
  }
}
