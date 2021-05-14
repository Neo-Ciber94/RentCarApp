import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client";
import { Employee } from "./Employee";

@Entity()
export class Rent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  employeeId!: number;

  @OneToOne(() => Employee)
  employee!: Employee;

  @Column()
  clientId!: number;

  @OneToOne(() => Client)
  client!: Client;

  @CreateDateColumn()
  rentDate!: Date;

  @Column({
    type: "datetime",
    nullable: true,
  })
  returnDate!: Date | null;

  @Column({
    type: "int",
    nullable: true,
  })
  totalDays!: number | null;

  @Column({
    type: "decimal",
    nullable: true,
  })
  totalPrice!: number | null;

  @Column({
    type: "mediumtext",
    nullable: true,
  })
  comments!: string | null;
}
