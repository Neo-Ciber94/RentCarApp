import { ClientDTO, EmployeeDTO, VehicleDTO } from ".";

export interface RentDTO {
  id: number;
  vehicleId: number;
  vehicle: VehicleDTO;
  employeeId: number;
  employee: EmployeeDTO;
  clientId: number;
  client: ClientDTO;
  rentDate: Date;
  returnDate?: Date;
  totalDays?: number;
  comments?: string;
}
