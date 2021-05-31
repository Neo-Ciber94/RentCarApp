import { Container, Loading, withCrudDataTable } from "src/components";
import { VehicleDTO } from "@shared/types";
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
    selector: (e) => `${e.model.brand.name} ${e.model.name}`,
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

  console.log(data);
  return (
    <Container className="h-full lg:max-w-5xl">
      {withCrudDataTable({
        columns,
        data: data || [],
        addButtonText: "Add Vehicle",
        addPath: "/vehicles/new",
        editPath: (e) => `/vehicles/${e.id}/edit`,
        deletePath: (e) => `/vehicles/${e.id}/delete`,
        detailsPath: (e) => `/vehicles/${e.id}`,
      })}
    </Container>
  );
}

function useVehicles() {
  return useQuery("vehicles", () => {
    return Services.vehicles.getAll();
  });
}
