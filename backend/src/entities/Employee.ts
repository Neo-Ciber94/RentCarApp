import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

export enum WorkShift {
  Morning = "morning",
  Evening = "evening",
  Night = "night",
}

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @OneToOne(() => User)
  user!: User;

  @Column({ type: "decimal" })
  comissionPercentage!: number;

  @Column({
    type: "enum",
    enum: WorkShift,
  })
  workShift!: WorkShift;
}
