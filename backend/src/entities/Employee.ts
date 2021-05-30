import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { WorkShift } from "@shared/types";
import { User } from "./User";

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @OneToOne(() => User, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user!: User;

  @Column({ type: "decimal" })
  comissionPercentage!: number;

  @Column({
    type: "enum",
    enum: WorkShift,
  })
  workShift!: WorkShift;
}
