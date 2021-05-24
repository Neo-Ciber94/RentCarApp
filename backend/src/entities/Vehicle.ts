import { GearBox, VehicleType } from "@shared/types";
import {
  BaseEntity,
  Check,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Fuel } from "./Fuel";
import { Model } from "./Model";

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
    enum: GearBox,
  })
  gearBox!: GearBox;

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
