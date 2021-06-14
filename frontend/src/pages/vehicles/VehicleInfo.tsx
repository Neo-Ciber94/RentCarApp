import { VehicleDTO } from "@shared/types";
import { ImageContainer } from "src/components/ImageContainer";
import { TextInfo } from "src/components/TextInfo";
import { bool2YesNo } from "src/utils/bool2YesNo";
import { getImage } from "src/utils/getImage";

interface VehicleInfoProps {
  vehicle: VehicleDTO;
}

export const VehicleInfo = ({ vehicle }: VehicleInfoProps) => {
  return (
    <>
      {vehicle.image != null && (
        <ImageContainer
          src={getImage(vehicle.image)}
          alt={vehicle.model.name}
        />
      )}
      <TextInfo label="ID" value={vehicle.id} />
      <TextInfo label="Model" value={vehicle.model.name} />
      <TextInfo label="Is Available" value={bool2YesNo(vehicle.isAvailable)} />
      <TextInfo label="Price Per Day" value={`${vehicle.rentPrice} RD$`} />
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
