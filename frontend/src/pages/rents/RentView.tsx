import { RentDTO } from "@shared/types";
import { TextInfo, Title } from "src/components";

interface RentViewProps {
  rent: RentDTO;
}

export function RentView(props: RentViewProps) {
  const { rent } = props;
  const client = rent.client;

  return (
    <>
      {/* Rent */}
      <Title title="Vehicle" />
      <TextInfo label="Rent ID" value={rent.id} />
      <TextInfo label="Vehicle ID" value={rent.vehicleId} />
      <TextInfo label="Employee ID" value={rent.employeeId} />
      <TextInfo label="Rent Date" value={rent.rentDate} />
      {rent.totalDays != null && (
        <TextInfo label="Totals Days" value={rent.totalDays} />
      )}
      {rent.totalPrice != null && (
        <TextInfo label="Totals Price" value={`${rent.totalPrice} RD$`} />
      )}
      <TextInfo label="Comments" value={rent.comments || ""} />

      {/* Client */}
      <Title title="Client" />
      <TextInfo label="Client ID" value={client.id} />
      <TextInfo label="Name" value={client.name} />
      <TextInfo label="Email" value={client.email} />
      <TextInfo label="Document ID" value={client.documentId} />
      <TextInfo label="Credit Card" value={client.creditCard} />
      <TextInfo label="Credit Limit" value={client.creditLimit || 0} />
      <TextInfo label="Legal Person" value={client.legalPerson} />
    </>
  );
}
