import {
  AfterInsert,
  AfterUpdate,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client";
import { Employee } from "./Employee";
import { Vehicle } from "./Vehicle";

@Entity()
export class Rent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  vehicleId!: number;

  @ManyToOne(() => Vehicle)
  @JoinColumn()
  vehicle!: Vehicle;

  @Column()
  employeeId!: number;

  @ManyToOne(() => Employee)
  @JoinColumn()
  employee!: Employee;

  @Column()
  clientId!: number;

  @OneToOne(() => Client)
  @JoinColumn()
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

  @BeforeInsert()
  @BeforeUpdate()
  async checkVehicleIsAvailable() {
    const vehicle = await Vehicle.findOne(this.vehicleId);

    if (vehicle!.isAvailable === false) {
      throw new Error(`Vehicle with id ${vehicle?.id} is not available`);
    }
  }
}
