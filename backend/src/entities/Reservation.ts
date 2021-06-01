import { ReservationStatus } from "@shared/types";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client";
import { Rent } from "./Rent";

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

  @Column({
    type: "enum",
    enum: ReservationStatus,
    default: ReservationStatus.Active,
  })
  status!: ReservationStatus;
}
