import { VehicleType } from "@shared/types";
import {
  BaseEntity,
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Brand } from "./Brand";

@Entity()
@Check("check_capacity", "CHECK(capacity > 0)")
export class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  brandId!: number;

  @ManyToOne(() => Brand, (brand) => brand.models)
  brand!: Brand;

  @Column({
    type: "enum",
    enum: VehicleType,
  })
  vehicleType!: VehicleType;

  @Column()
  capacity!: number;
}
