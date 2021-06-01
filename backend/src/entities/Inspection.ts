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
import { Client } from "./Client";
import { Vehicle } from "./Vehicle";

@Entity()
export class Inspection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  vehicleId!: number;

  @ManyToOne(() => Vehicle)
  vehicle!: Vehicle;

  @Column()
  clientId!: number;

  @OneToOne(() => Client)
  @JoinColumn()
  client!: Client;

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
