import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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

  @OneToOne(() => Vehicle)
  vehicle!: Vehicle;

  @Column()
  clientId!: number;

  @OneToOne(() => Client)
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

  @Column()
  tireStatus!: boolean;

  @Column({
    type: "mediumtext",
    nullable: true,
  })
  status!: string | null;
}
