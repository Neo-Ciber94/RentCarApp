import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum LegalPerson {
  Physical = "physical",
  Juridical = "juridical",
}

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  documentId!: string;

  @Column()
  creditCard!: string;

  @Column({ type: "decimal" })
  creditLimit!: number;

  @Column({
    type: "enum",
    enum: LegalPerson,
  })
  legalPerson!: LegalPerson;
}
