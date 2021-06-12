import { EmployeeDTO } from "@shared/types";
import { JsonController } from "routing-controllers";
import { Employee } from "src/entities";
import { EmployeeMapper } from "src/mapper/EmployeeMapper";
import { AbstractController } from "./AbstractController";

@JsonController("/employees")
export class EmployeeController extends AbstractController<
  Employee,
  EmployeeDTO
> {
  constructor() {
    super({
      repository: Employee.getRepository(),
      relations: ["user"],
      mapper: new EmployeeMapper(),
    });
  }
}
