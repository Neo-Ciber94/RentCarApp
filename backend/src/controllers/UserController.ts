import { Get, JsonController, Param, QueryParam } from "routing-controllers";
import { UserRepository } from "src/repositories";

@JsonController("/users")
export class UserController {
  private repository = new UserRepository();

  @Get()
  findUser(@QueryParam("email") email?: string) {
    if (email) {
      return this.repository.getByEmail(email);
    }

    return this.repository.getAll();
  }

  @Get("/:id")
  findUserById(@Param("id") id: number) {
    return this.repository.getById(id);
  }
}
