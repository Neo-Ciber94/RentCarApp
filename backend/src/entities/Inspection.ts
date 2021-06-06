import { TireStatus } from "@shared/types";
import {
  BaseEntity,
  Column,
  ColumnOptions,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rent } from "./Rent";

const DEFAULT_TIRE_STATUS: ColumnOptions = {
  type: "enum",
  enum: TireStatus,
  default: TireStatus.Normal,
};

@Entity()
export class Inspection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  rentId!: number;

  @ManyToOne(() => Rent)
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

  @Column(DEFAULT_TIRE_STATUS)
  frontLeftTire!: TireStatus;

  @Column(DEFAULT_TIRE_STATUS)
  frontRightTire!: TireStatus;

  @Column(DEFAULT_TIRE_STATUS)
  backLeftTire!: TireStatus;

  @Column(DEFAULT_TIRE_STATUS)
  backRightTire!: TireStatus;

  @Column({
    type: "mediumtext",
    nullable: true,
  })
  status!: string | null;
}
