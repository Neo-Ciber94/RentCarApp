import { VehicleDTO } from "@shared/types";
import { Colors } from "src/layout";

interface VehicleCardProps {
  photo?: string;
  vehicle: VehicleDTO;
  className?: string;
  onClick?: () => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  photo,
  className,
  onClick,
}) => {
  const vehicleName = `${vehicle.model.brand.name} ${vehicle.model.name}`;

  return (
    <div
      onClick={onClick}
      className={`flex flex-col shadow-md ring-1 ring-gray-300 rounded-lg overflow-hidden sm:w-64 w-full ${
        className || ""
      }`}
    >
      <div>
        <img
          src={
            photo ||
            "https://www.autodetective.com/image/medium/ford/explorer/2016/804077.jpg"
          }
          alt={vehicleName}
          style={{
            height: 150,
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <div
        style={{ backgroundColor: Colors.MainColor, height: 15, width: "100%" }}
      />
      <div className="text-black text-2xl pt-2 px-2 font-light">
        {vehicleName}
      </div>

      <div className="px-2 py-5">
        <VehicleInfo
          icon="fas fa-users"
          value={`${vehicle.model.capacity} people`}
        />
        <VehicleInfo icon="fas fa-gas-pump" value={vehicle.fuel.name} />
        <VehicleInfo icon="fas fa-exchange-alt" value={vehicle.gearBox} />
        <VehicleInfo
          icon="fas fa-dollar-sign"
          value={`${vehicle.rentPrice}RD$ per day`}
        />
      </div>
    </div>
  );
};

const VehicleInfo: React.FC<{ icon: string; value: string | number }> = ({
  icon,
  value,
}) => {
  return (
    <div className="flex flex-row mb-1">
      <div>
        <i className={`text-lg w-12 px-2 text-red-600  ${icon}`}></i>
      </div>
      <div className="text-lg font-light text-gray-500">{value}</div>
    </div>
  );
};
