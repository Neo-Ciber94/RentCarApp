import { DOCUMENT_ID_LENGTH } from "@shared/config";
import { UserRole, UserStatus } from "@shared/types";
import {
  BaseEntity,
  Check,
  Column,
  CreateDateColumn,
  DeepPartial,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./Employee";
import { UserSession } from "./UserSession";

@Entity()
@Index("idx_email", ["email"])
@Check("check_document_length", `LENGTH(documentId) = ${DOCUMENT_ID_LENGTH}`)
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

  static createWithRole(entityLike: DeepPartial<User> & { role: UserRole }) {
    return User.create(entityLike);
  }

  static findUserByEmail(email: string): Promise<User | undefined> {
    return User.findOne({
      where: { email },
    });
  }
}
