import { RentDTO } from "@shared/types";
import { IDataTableColumn } from "react-data-table-component";
import { Container, Loading, withCrudDataTable } from "src/components";
import { useAllRents } from "src/hooks/rentHooks";

const columns: IDataTableColumn<RentDTO>[] = [
  {
    name: "ID",
    selector: (e) => e.id,
  },

  {
    name: "Vehicle",
    selector: (e) => `${e.vehicle.model.brand.name} ${e.vehicle.model.name}`,
  },

  {
    name: "Employee",
    selector: (e) => `${e.employee.user.firstName} ${e.employee.user.lastName}`,
  },

  {
    name: "Rent Date",
    selector: (e) => e.rentDate,
  },
];

export function Rents() {
  const { isLoading, data = [] } = useAllRents();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      {withCrudDataTable({
        columns,
        data,
        canAdd: false,
        canDelete: false,
        canEdit: false,
        onEdit: (row) => console.log("Edit", row),
      })}
    </Container>
  );
}
