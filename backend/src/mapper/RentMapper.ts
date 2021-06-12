import { ClientDTO, RentDTO, VehicleDTO } from "@shared/types";
import { Rent } from "src/entities";
import { Mapper } from "src/utils";
import { EmployeeMapper } from "./EmployeeMapper";

export class RentMapper extends Mapper<Rent, RentDTO> {
  readonly employeeMapper = new EmployeeMapper();

  constructor() {
    super();
  }

  map(entity: Rent): RentDTO {
    return {
      id: entity.id,
      client: entity.client as ClientDTO,
      clientId: entity.clientId,
      employee: this.employeeMapper.map(entity.employee),
      employeeId: entity.employeeId,
      rentDate: entity.rentDate,
      returnDate: entity.returnDate as Date | undefined,
      vehicle: entity.vehicle as VehicleDTO,
      vehicleId: entity.vehicleId,
      comments: entity.comments as string | undefined,
      totalDays: entity.totalDays as number | undefined,
      totalPrice: entity.totalPrice as number | undefined,
    };
  }
}
