import { TireStatus } from "@shared/types";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rent } from "./Rent";
import { Vehicle } from "./Vehicle";

@Entity()
export class Inspection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  // FIXME: Remove vehicle due can be accessed in `rent`
  @Column()
  vehicleId!: number;

  @ManyToOne(() => Vehicle)
  vehicle!: Vehicle;

  @Column()
  rentId!: number;

  @OneToOne(() => Rent)
  @JoinColumn()
  rent!: Rent;

  @CreateDateColumn()
  inspectionDate!: Date;

  @Column()
  haveScratches!: boolean;

  @Column()
  haveBrokenGlass!: boolean;

  @Column()
  haveCarJack!: boolean;

  @Column()
  haveTires!: boolean;

  @Column({
    type: "enum",
    enum: TireStatus,
    default: TireStatus.Normal,
  })
  tireStatus!: TireStatus;

  @Column({
    type: "mediumtext",
    nullable: true,
  })
  status!: string | null;
}
