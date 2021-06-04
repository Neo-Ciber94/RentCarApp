import { TextInfo } from "src/components";
import { RentFormValues } from "./RentFormValues";

interface RentConfirmationProps {
  values: RentFormValues;
}

export function RentView({ values }: RentConfirmationProps) {
  return (
    <>
      {/* Rent */}
      <Title title="Vehicle" />
      {values.rentId && <TextInfo label="Rent ID" value={values.rentId} />}
      <TextInfo label="Vehicle ID" value={values.vehicleId} />
      <TextInfo label="Employee ID" value={values.employeeId} />
      {values.rentDate && (
        <TextInfo label="Rent Date" value={values.rentDate} />
      )}
      {values.totalDays && (
        <TextInfo label="Totals Days" value={values.totalDays} />
      )}
      {values.totalPrice && (
        <TextInfo label="Totals Price" value={values.totalPrice} />
      )}
      <TextInfo label="Comments" value={values.comments || ""} />

      {/* Client */}
      <Title title="Client" />
      {values.clientId && (
        <TextInfo label="Client ID" value={values.clientId} />
      )}
      <TextInfo label="Name" value={values.name} />
      <TextInfo label="Email" value={values.email} />
      <TextInfo label="Document ID" value={values.documentId} />
      <TextInfo label="Credit Card" value={values.creditCard} />
      <TextInfo label="Credit Limit" value={values.creditLimit || 0} />
      <TextInfo label="Legal Person" value={values.legalPerson} />

      {/* Inspection */}
      <Title title="Inspection" />
      {values.inspectionId && (
        <TextInfo label="Inspection ID" value={values.inspectionDate} />
      )}

      {values.inspectionDate && (
        <TextInfo label="Inspection Date" value={values.inspectionDate} />
      )}

      <TextInfo label="Have Scratches" value={yesOrNot(values.haveScratches)} />
      <TextInfo
        label="Have Broken Class"
        value={yesOrNot(values.haveBrokenGlass)}
      />
      <TextInfo label="Have CarJack" value={yesOrNot(values.haveCarJack)} />
      <TextInfo label="Have Tires" value={yesOrNot(values.haveTires)} />
      <TextInfo label="Tire Status" value={values.tireStatus} />
      <TextInfo label="Status" value={values.status || ""} />
    </>
  );
}

function Title({ title }: { title: string }) {
  return (
    <div className="mb-5 mt-4">
      <h2 className="font-bold text-2xl text-red-600">{title}</h2>
      <div className="bg-red-600 h-2 w-full shadow"></div>
    </div>
  );
}

function yesOrNot(value: boolean) {
  return value ? "Yes" : "No";
}
