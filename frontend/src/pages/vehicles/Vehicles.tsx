import {
  Container,
  Loading,
  CheckboxButton,
  withCrudDataTable,
} from "src/components";
import { VehicleDTO } from "@shared/types";
import { IDataTableColumn } from "react-data-table-component";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { AuthContext } from "src/context/AuthContext";
import { VehicleCard } from ".";
import { useAllVehicles } from "src/hooks";
import { useHistory } from "react-router";
import Routes from "src/routes/Routes";

const SHOW_KIND_KEY = "vehicles-show-kind";

enum ShowKind {
  Grid = "grid",
  Table = "table",
}

interface ButtonShowKindProps {
  kind: ShowKind;
  onGrid: () => void;
  onTable: () => void;
}

const columns: IDataTableColumn<VehicleDTO>[] = [
  {
    name: "ID",
    sortable: true,
    selector: (e) => e.id,
  },

  {
    name: "Model",
    sortable: true,
    selector: (e) => `${e.model.brand.name} ${e.model.name}`,
  },

  {
    name: "Available",
    sortable: true,
    cell: (row) => (
      <p className={row.isAvailable ? "text-green-600" : "text-red-600"}>
        {row.isAvailable ? "Yes" : "No"}
      </p>
    ),
  },

  {
    name: "Fuel",
    sortable: true,
    selector: (e) => e.fuel.name,
  },

  {
    name: "GearBox",
    sortable: true,
    selector: (e) => e.gearBox,
  },
];

function getInitialShowKind(): ShowKind {
  const stored = sessionStorage.getItem(SHOW_KIND_KEY);
  if (stored === ShowKind.Grid || stored === ShowKind.Table) {
    return stored;
  }

  return ShowKind.Grid;
}

export const Vehicles = observer(() => {
  const authService = useContext(AuthContext);
  const history = useHistory();
  const [showKind, setShowKind] = useState(getInitialShowKind);
  const [showAll, setShowAll] = useState(false);
  const { isLoading, data = [] } = useAllVehicles();

  const setAndSaveShowKind = (value: ShowKind) => {
    sessionStorage.setItem(SHOW_KIND_KEY, value);
    setShowKind(value);
  };

  const buttonGroup = (
    <div className="flex flex-row w-full justify-between">
      <CheckboxButton
        text="View All"
        className="h-full font-bold"
        checked={showAll}
        onClick={() => setShowAll(!showAll)}
      />
      <ButtonShowKind
        kind={showKind}
        onGrid={() => setAndSaveShowKind(ShowKind.Grid)}
        onTable={() => setAndSaveShowKind(ShowKind.Table)}
      />
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }

  // Get all the available vehicles
  let availableVehicles: VehicleDTO[];

  if (showAll) {
    availableVehicles = data;
  } else {
    availableVehicles = data.filter((v) => v.isAvailable);
  }

  if (authService.currentUser == null || showKind === ShowKind.Grid) {
    const vehicles = availableVehicles.map((e, index) => (
      <VehicleCard
        key={index}
        vehicle={e}
        className="cursor-pointer animate-fadein"
        onClick={(v) => {
          if (authService.isAuthenticated) {
            history.push(Routes.vehicles(v.id));
          }
        }}
      />
    ));

    return (
      <Container className="lg:max-w-5xl">
        {authService.currentUser != null && buttonGroup}
        <div className="flex flex-row flex-wrap gap-4">{vehicles}</div>
      </Container>
    );
  }

  return (
    <Container className="lg:max-w-5xl">
      {buttonGroup}
      {withCrudDataTable({
        columns,
        data: data,
        addButtonText: "Add Vehicle",
        addPath: Routes.vehicles("new"),
        editPath: (e) => Routes.vehicles(e.id, "edit"),
        deletePath: (e) => Routes.vehicles(e.id, "delete"),
        detailsPath: (e) => Routes.vehicles(e.id),
      })}
    </Container>
  );
});

const ButtonShowKind: React.FC<ButtonShowKindProps> = ({
  onGrid,
  onTable,
  kind,
}) => {
  const className =
    "text-white font-bold py-2 px-10 hover:bg-red-800 focus:outline-none";

  return (
    <div className="flex flex-row py-2 justify-end">
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
