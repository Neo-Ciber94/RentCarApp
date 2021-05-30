import { WorkShift } from "../WorkShift";
import { UserDTO } from "./UserDTO";

export interface EmployeeDTO {
  id: number;
  userId: number;
  user: UserDTO;
  comissionPercentage: number;
  workShift: WorkShift;
}
