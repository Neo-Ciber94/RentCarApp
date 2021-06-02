import { CREDIT_CARD_LENGTH } from "@shared/config";
import { LegalPerson } from "@shared/types/LegalPerson";
import {
  BaseEntity,
  Check,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@Check("check_credit_card_length", `LENGTH(creditCard) = ${CREDIT_CARD_LENGTH}`)
@Check("check_credit_limit", "creditLimit = NULL OR creditLimit > 0")
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

  @Column({ type: "decimal", nullable: true })
  creditLimit!: number | null;

  @Column({
    type: "enum",
    enum: LegalPerson,
  })
  legalPerson!: LegalPerson;
}
