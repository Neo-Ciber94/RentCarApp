import { VehicleDTO } from "@shared/types";

interface VehicleCardProps {
  photo?: string;
  vehicle: VehicleDTO;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, photo }) => {
  return (
    <div className="flex flex-col shadow rounded-sm">
      <div>
        <img
          src={
            photo ||
            "https://www.elcarrocolombiano.com/wp-content/uploads/2020/10/20201110-Ford-011-S%C3%8D-768x471.jpg"
          }
          height={300}
          width="auto"
          style={{ objectFit: "cover" }}
        />
      </div>

      <hr style={{ color: "red", height: 20 }} />
      <VehicleInfo icon="fas fa-users" value={vehicle.model.capacity} />
      <VehicleInfo icon="fas fa-gas-pump" value={vehicle.fuel.name} />
      <VehicleInfo icon="fas fa-exchange-alt" value={vehicle.gearBox} />
      <VehicleInfo
        icon="fas fa-dollar-sign"
        value={`${vehicle.rentPrice} per day`}
      />
    </div>
  );
};

const VehicleInfo: React.FC<{ icon: string; value: string | number }> = ({
  icon,
  value,
}) => {
  return (
    <div className="flex flex-row">
      <div>
        <i className={`text-lg text-red-600 ${icon}`}></i>
      </div>
      <div className="text-lg text-gray-800">{value}</div>
    </div>
  );
};
