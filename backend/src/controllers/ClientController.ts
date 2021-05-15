import { JsonController } from "routing-controllers";
import { Client } from "src/entities";
import { AbstractController } from "./AbstractController";

@JsonController("/clients")
export class ClientController extends AbstractController<Client> {
  constructor() {
    super({
      repository: Client.getRepository(),
    });
  }
}
