import {
  BaseEntity,
  Check,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { WorkShift } from "@shared/types";
import { User } from "./User";

@Entity()
@Check("check_comission_percentage", "comissionPercentage >= 0")
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

  @Column({ type: "decimal", precision: 3, scale: 2 })
  comissionPercentage!: number;

  @Column({
    type: "enum",
    enum: WorkShift,
  })
  workShift!: WorkShift;
}
