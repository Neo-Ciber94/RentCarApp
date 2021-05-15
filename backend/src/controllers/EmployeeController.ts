import { JsonController } from "routing-controllers";
import { Employee } from "src/entities";
import { AbstractController } from "./AbstractController";

@JsonController("/employees")
export class EmployeeController extends AbstractController<Employee> {
  constructor() {
    super({
      repository: Employee.getRepository(),
    });
  }
}
