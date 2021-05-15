import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { SessionEntity } from "typeorm-store";
import { User } from "./User";

@Entity()
export class UserSession extends BaseEntity implements SessionEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: "int" })
  expiresAt!: number;

  @Column()
  data!: string;

  @Column({
    nullable: true,
  })
  userId!: number | null;

  @ManyToOne(() => User, (user) => user.sessions)
  user!: User | null;
}
