import { EmployeeDTO, UserDTO } from "@shared/types";
import { IDataTableColumn } from "react-data-table-component";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import {
  Container,
  CustomDataTable,
  LinkButton,
  Loading,
} from "src/components";
import { Routes } from "src/layout";
import { Services } from "src/services";

interface UserEmployee extends UserDTO {
  employee?: EmployeeDTO;
  employeeId?: number;
}

const columns: IDataTableColumn<UserEmployee>[] = [
  {
    name: "ID",
    selector: (e) => e.id,
  },

  {
    name: "First Name",
    selector: (e) => e.firstName,
  },

  {
    name: "Last Name",
    selector: (e) => e.lastName,
  },

  {
    name: "Email",
    selector: (e) => e.email,
  },

  {
    name: "Role",
    selector: (e) => e.role,
  },
];

export function Employees() {
  const { isLoading, data = [] } = useUserEmployees();

  if (isLoading || data == null) {
    return <Loading />;
  }

  const mergedColumns: IDataTableColumn<UserEmployee>[] = [
    ...columns,
    {
      name: "Actions",
      cell: (row) => {
        if (row.employee == null) {
          return <div></div>;
        }

        return (
          <div className="flex flex-row w-full justify-center gap-4 lg:gap-10">
            <NavLink to={`${Routes.employees.path}/${row.employee.id}`}>
              <i className="fas fa-info-circle text-gray-500 hover:text-gray-700 cursor-pointer"></i>
            </NavLink>

            <NavLink to={`${Routes.employees.path}/:${row.employee.id}/edit`}>
              <i className="fas fa-edit text-green-600 hover:text-green-800 cursor-pointer"></i>
            </NavLink>
          </div>
        );
      },
    },
  ];
  return (
    <Container className="h-full lg:max-w-5xl">
      <div className="p-2">
        <LinkButton className="text-lg" to={`${Routes.employees.path}/new`}>
          Add Employee
        </LinkButton>
      </div>
      <CustomDataTable columns={mergedColumns} data={data} />
    </Container>
  );
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

function useUserEmployees() {
  return useQuery("users", fetchUsersEmployees);
}
