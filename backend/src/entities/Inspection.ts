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
