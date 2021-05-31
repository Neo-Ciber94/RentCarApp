import { Container, Loading, withCrudDataTable } from "src/components";
import { VehicleDTO } from "@shared/types";
import { MainButton } from "src/components/Buttons";
import { useQuery } from "react-query";
import { Services } from "src/services";
import { IDataTableColumn } from "react-data-table-component";

const columns: IDataTableColumn<VehicleDTO>[] = [
  {
    name: "ID",
    selector: (e) => e.id,
  },

  {
    name: "Model",
    selector: (e) => e.model,
  },

  {
    name: "Fuel",
    selector: (e) => e.fuel.name,
  },

  {
    name: "GearBox",
    selector: (e) => e.gearBox,
  },
];

export default function Vehicles() {
  const { isLoading, data } = useVehicles();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="h-full">
      {withCrudDataTable({
        columns,
        data: data || [],
        addButtonText: "Add Vehicle",
        addPath: "/vehicles/new",
        editPath: (e) => `/vehicle/${e.id}/edit`,
        deletePath: (e) => `/vehicle/${e.id}/delete`,
        detailsPath: (e) => `/vehicle/${e.id}`,
      })}
    </Container>
  );
}

function useVehicles() {
  return useQuery("vehicles", () => {
    return Services.vehicles.getAll();
  });
}
