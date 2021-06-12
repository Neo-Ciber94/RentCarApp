import { EmployeeDTO } from "@shared/types";
import { Employee } from "src/entities";
import { Mapper } from "src/utils";
import { UserMapper } from "./UserMapper";

export class EmployeeMapper extends Mapper<Employee, EmployeeDTO> {
  userMapper = new UserMapper();

  constructor() {
    super();
  }

  map(entity: Employee): EmployeeDTO {
    return {
      id: entity.id,
      comissionPercentage: entity.comissionPercentage,
      workShift: entity.workShift,
      userId: entity.userId,
      user: this.userMapper.map(entity.user),
    };
  }
}
