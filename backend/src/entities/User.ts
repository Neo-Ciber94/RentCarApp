import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserSession } from "./UserSession";

export enum UserRole {
  Admin = "admin",
  Employee = "employee",
}

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  documentId!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  salt!: string;

  @Column({ unique: true })
  hash!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.Employee,
  })
  role!: UserRole;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.Active,
  })
  status!: UserStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => UserSession, (session) => session.user, {
    onDelete: "CASCADE",
  })
  sessions!: UserSession[];
}
