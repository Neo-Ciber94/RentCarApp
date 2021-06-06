import { RentDTO } from "@shared/types";
import { TextInfo, Title } from "src/components";
import { Row } from "src/components/Row";

interface RentViewProps {
  rent: RentDTO;
}

export function RentView(props: RentViewProps) {
  const { rent } = props;
  const client = rent.client;

  const vehicle = rent.vehicle;
  const employee = rent.employee;

  return (
    <>
      {/* Rent */}
      <Title title="Vehicle" />

      <TextInfo label="Rent ID" value={rent.id} />

      <TextInfo label="Rent Date" value={rent.rentDate} />

      <Row>
        <TextInfo label="Vehicle ID" value={vehicle.id} />

        <TextInfo
          label="Vehicle"
          value={`${vehicle.model.brand.name} ${vehicle.model.name}`}
        />
      </Row>

      <Row>
        <TextInfo label="Employee ID" value={employee.id} />
        <TextInfo
          label="Employee"
          value={`${employee.user.firstName} ${employee.user.lastName}`}
        />
      </Row>

      <Row>
        {rent.totalDays != null && (
          <TextInfo label="Totals Days" value={rent.totalDays} />
        )}
        {rent.totalPrice != null && (
          <TextInfo label="Totals Price" value={`${rent.totalPrice} RD$`} />
        )}
      </Row>
      <TextInfo label="Comments" value={rent.comments || ""} />

      {/* Client */}
      <Title title="Client" />
      <TextInfo label="Client ID" value={client.id} />

      <Row>
        <TextInfo label="Name" value={client.name} />
        <TextInfo label="Email" value={client.email} />
      </Row>

      <Row>
        <TextInfo label="Document ID" value={client.documentId} />
        <TextInfo label="Legal Person" value={client.legalPerson} />
      </Row>

      <Row>
        <TextInfo label="Credit Card" value={client.creditCard} />
        <TextInfo label="Credit Limit" value={client.creditLimit || 0} />
      </Row>
    </>
  );
}
