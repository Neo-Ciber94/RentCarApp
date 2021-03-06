import { GearBox, VehicleType } from "@shared/types";
import {
  BaseEntity,
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Fuel } from "./Fuel";
import { Inspection } from "./Inspection";
import { Model } from "./Model";

@Entity()
@Check("chk_rentPrice", "rentPrice > 0")
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  modelId!: number;

  @ManyToOne(() => Model)
  @JoinColumn()
  model!: Model;

  @Column()
  fuelId!: number;

  @ManyToOne(() => Fuel)
  @JoinColumn()
  fuel!: Fuel;

  @Column({ type: "tinytext", nullable: true })
  image!: string | null;

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

  @Column({
    type: "text",
    nullable: true,
  }) // TODO: Use an enum?
  status!: string | null;

  @Column({
    type: "text",
    nullable: true,
  })
  description!: string | null;

  @Column({
    default: true,
  })
  isAvailable!: boolean;
}
