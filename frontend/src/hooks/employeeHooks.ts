import { UserDTO, EmployeeDTO } from "@shared/types";
import { useQuery } from "react-query";
import { Services } from "src/services";

export interface UserEmployee extends UserDTO {
  employee?: EmployeeDTO;
  employeeId?: number;
}

export function useEmployee(id: number) {
  return useQuery("employee", {
    refetchOnMount: true,
    queryFn: () => Services.employees.get(id),
  });
}

export function useUserEmployees() {
  return useQuery("userEmployees", {
    refetchOnMount: true,
    queryFn: fetchUsersEmployees,
  });
}

async function fetchUsersEmployees() {
  const result: UserEmployee[] = [];

  // Fetch users and employees
  const users = await Services.users.getAll();
  const employees = await Services.employees.getAll();

  for (const user of users) {
    const employee = employees.find((e) => e.userId === user.id);
    const userEmployee: UserEmployee = {
      ...user,
      employee,
      employeeId: employee?.id,
    };

    result.push(userEmployee);
  }

  return result;
}
