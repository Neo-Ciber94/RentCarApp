import { Container, Loading, withCrudDataTable } from "src/components";
import { VehicleDTO } from "@shared/types";
import { IDataTableColumn } from "react-data-table-component";
import { observer } from "mobx-react-lite";
import { useContext, useMemo, useState } from "react";
import { AuthContext } from "src/context/AuthContext";
import { VehicleCard } from ".";
import { useAllVehicles } from "src/hooks";

enum ShowKind {
  Grid,
  Table,
}

interface ButtonShowKind {
  kind: ShowKind;
  onGrid: () => void;
  onTable: () => void;
}

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

export const Vehicles = observer(() => {
  const authService = useContext(AuthContext);
  const [showKind, setShowKind] = useState(ShowKind.Table);
  const { isLoading, data = [] } = useAllVehicles();

  const buttonGroup = useMemo(
    () => (
      <ButtonShowKind
        kind={showKind}
        onGrid={() => setShowKind(ShowKind.Grid)}
        onTable={() => setShowKind(ShowKind.Table)}
      />
    ),
    [showKind, setShowKind]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (authService.currentUser == null || showKind === ShowKind.Grid) {
    const vehicles = data.map((e, index) => (
      <VehicleCard key={index} vehicle={e} />
    ));

    return (
      <div>
        <Container className="h-full lg:max-w-5xl">
          {authService.currentUser != null && buttonGroup}
          <div className="flex flex-row flex-wrap gap-4">{vehicles}</div>
        </Container>
      </div>
    );
  }

  return (
    <Container className="h-full lg:max-w-5xl">
      {buttonGroup}
      {withCrudDataTable({
        columns,
        data: data,
        addButtonText: "Add Vehicle",
        addPath: "/vehicles/new",
        editPath: (e) => `/vehicles/${e.id}/edit`,
        deletePath: (e) => `/vehicles/${e.id}/delete`,
        detailsPath: (e) => `/vehicles/${e.id}`,
      })}
    </Container>
  );
});

const ButtonShowKind: React.FC<ButtonShowKind> = ({
  onGrid,
  onTable,
  kind,
}) => {
  const className =
    "text-white font-bold py-2 px-10  hover:bg-red-800 focus:outline-none";

  return (
    <div className="flex flex-row py-2 w-full justify-end">
      <button
        onClick={onGrid}
        className={`${className} rounded-l ${
          kind === ShowKind.Grid ? "bg-red-800" : "bg-red-600"
        } `}
      >
        <i className="fas fa-border-all mr-2"></i>
        Grid
      </button>
      <button
        onClick={onTable}
        className={`${className} rounded-r ${
          kind === ShowKind.Table ? "bg-red-800" : "bg-red-600"
        }`}
      >
        <i className="fas fa-list mr-2"></i>
        Table
      </button>
    </div>
  );
};
