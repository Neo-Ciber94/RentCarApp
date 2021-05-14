import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rent } from "./Rent";

export enum ReservationStatus {
  Active = "active",
  Completed = "completed",
  Cancelled = "cancelled",
}

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  clientId!: number;

  @Column({
    type: "int",
    nullable: true,
  })
  rentId!: number | null;

  @OneToOne(() => Rent)
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
