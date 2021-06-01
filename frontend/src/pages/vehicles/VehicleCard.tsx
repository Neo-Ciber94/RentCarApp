import { VehicleDTO } from "@shared/types";

interface VehicleCardProps {
  photo?: string;
  vehicle: VehicleDTO;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, photo }) => {
  return (
    <div className="flex flex-col shadow-md rounded-lg overflow-hidden sm:w-72 w-full">
      <div>
        <img
          src={
            photo ||
            "https://www.autodetective.com/image/medium/ford/explorer/2016/804077.jpg"
          }
          style={{
            height: 200,
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <div style={{ backgroundColor: "red", height: 10, width: "100%" }} />
      <div className="text-black text-3xl pt-2 px-2 font-light">{`${vehicle.model.brand.name} ${vehicle.model.name}`}</div>

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
        <i className={`text-xl w-16 px-2 text-red-600  ${icon}`}></i>
      </div>
      <div className="text-xl font-light text-gray-500">{value}</div>
    </div>
  );
};
