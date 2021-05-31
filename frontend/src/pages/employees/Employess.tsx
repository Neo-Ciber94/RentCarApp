import { IDataTableColumn } from "react-data-table-component";
import { NavLink } from "react-router-dom";
import {
  Container,
  CustomDataTable,
  LinkButton,
  Loading,
} from "src/components";
import { Routes } from "src/layout";
import { UserEmployee, useUserEmployees } from "./hooks";

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

            <NavLink to={`${Routes.employees.path}/${row.employee.id}/edit`}>
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
        <LinkButton className="text-lg p-1" to={`${Routes.employees.path}/new`}>
          Add Employee
        </LinkButton>
      </div>
      <CustomDataTable columns={mergedColumns} data={data} />
    </Container>
  );
}
