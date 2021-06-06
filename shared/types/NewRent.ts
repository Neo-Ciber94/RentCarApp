import { LegalPerson } from ".";

export interface NewRent {
  // Rent
  vehicleId: number;
  employeeId: number;
  comments?: string;

  // Client
  name: string;
  email: string;
  documentId: string;
  creditCard: string;
  creditLimit?: number;
  legalPerson: LegalPerson;
}
