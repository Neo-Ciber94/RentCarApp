import { ReservationStatus } from "@shared/types";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client";
import { Rent } from "./Rent";
import { Vehicle } from "./Vehicle";

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  clientId!: number;

  @OneToOne(() => Client)
  @JoinColumn()
  client!: Client;

  @Column({
    type: "int",
    nullable: true,
  })
  rentId!: number | null;

  @OneToOne(() => Rent)
  @JoinColumn()
  rent!: Rent | null;

  @CreateDateColumn()
  reservationDate!: Date;

  @Column()
  vehicleId!: number;

  @ManyToOne(() => Vehicle)
  @JoinColumn()
  vehicle!: Vehicle;

  @Column({
    type: "enum",
    enum: ReservationStatus,
    default: ReservationStatus.Active,
  })
  status!: ReservationStatus;

  @BeforeInsert()
  @BeforeUpdate()
  async checkVehicleIsAvailable() {
    const vehicle = await Vehicle.findOne(this.vehicleId);

    if (vehicle == null) {
      throw new Error("Vehicle to reserve is null");
    }

    if (vehicle.isAvailable === false) {
      throw new Error(`Vehicle with id ${vehicle.id} is not available`);
    }
  }
}
