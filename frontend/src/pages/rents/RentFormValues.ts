import { LegalPerson, TireStatus } from "@shared/types";

// Rent
export type RentValues = {
  rentId?: number;
  vehicleId: number;
  employeeId: number;
  rentDate?: Date;
  returnDate?: Date;
  totalDays?: number;
  totalPrice?: number;
  comments?: string;
};

// Client
export type RentClientValues = {
  clientId?: number;
  name: string;
  email: string;
  documentId: string;
  creditCard: string;
  creditLimit?: number;
  legalPerson: LegalPerson;
};

// Inspection
export type RentInspectionValues = {
  inspectionId?: number;
  inspectionDate?: Date;
  haveScratches: boolean;
  haveBrokenGlass: boolean;
  haveCarJack: boolean;
  haveTires: boolean;
  frontLeftTire: TireStatus;
  frontRightTire: TireStatus;
  backLeftTire: TireStatus;
  backRightTire: TireStatus;
  status?: string;
};

export interface RentFormValues
  extends RentValues,
    RentClientValues,
    RentInspectionValues {}
