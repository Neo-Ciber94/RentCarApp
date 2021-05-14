import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Fuel } from "./Fuel";
import { Model } from "./Model";

export enum VehicleType {
  Car = "car",
  Jeep = "jeep",
  Wagon = "wagon",
}

@Entity()
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  modelId!: number;

  @OneToOne(() => Model)
  model!: Model;

  @Column()
  fuelId!: number;

  @OneToOne(() => Fuel)
  fuel!: Fuel;

  @Column({ unique: true })
  engineNumber!: string;

  @Column({ unique: true })
  chassisNumber!: string;

  @Column({ unique: true })
  licensePlate!: string;

  @Column({
    type: "enum",
    enum: VehicleType,
  })
  vehicleType!: VehicleType;

  @Column({ type: "decimal" })
  rentPrice!: number;

  @Column() // TODO: Use an enum?
  status!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description!: string | null;
}
