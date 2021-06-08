import { Vehicle } from "src/entities";
import { EntityManager } from "typeorm";

export async function markVehicleAvailable(
  vehicleId: number,
  isAvailable: boolean,
  manager?: EntityManager
) {
  if (manager) {
    const vehicle = await manager.findOne(Vehicle, vehicleId);
    vehicle!.isAvailable = isAvailable;
    await manager.save(vehicle);
  } else {
    const vehicle = await Vehicle.findOne(vehicleId);
    vehicle!.isAvailable = isAvailable;
    await Vehicle.save(vehicle!);
  }
}
