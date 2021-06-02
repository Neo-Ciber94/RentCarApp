import { VehicleDTO } from "@shared/types";
import { TextInfo } from "src/components/TextInfo";

interface VehicleInfoProps {
  vehicle: VehicleDTO;
}

export const VehicleInfo = ({ vehicle }: VehicleInfoProps) => {
  return (
    <>
      <TextInfo label="ID" value={vehicle.id} />
      <TextInfo label="Model" value={vehicle.model.name} />
      <TextInfo label="Fuel" value={vehicle.fuel.name} />
      <TextInfo label="Engine Number" value={vehicle.engineNumber} />
      <TextInfo label="Chassis Number" value={vehicle.chassisNumber} />
      <TextInfo label="License Plate" value={vehicle.licensePlate} />
      <TextInfo label="GearBox" value={vehicle.gearBox} />
      {/* <TextInfo label="Status" value={vehicle.status} /> */}
      <TextInfo label="Description" value={vehicle.description} />
    </>
  );
};