import { LegalPerson } from "../LegalPerson";

export interface ClientDTO {
  id: number;
  name: string;
  email: string;
  documentId: string;
  creditCard: string;
  creditLimit: number;
  legalPerson: LegalPerson;
}
