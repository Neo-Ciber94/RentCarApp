import { Loading, TextInfo, Title } from "src/components";
import { useVehicle } from "src/hooks";
import { useEmployee } from "src/hooks/employeeHooks";
import { bool2YesNo } from "src/utils/bool2YesNo";
import { RentFormValues } from "./RentFormValues";

interface RentConfirmationProps {
  values: RentFormValues;
}

export function RentConfirmation({ values }: RentConfirmationProps) {
  const vehicleQuery = useVehicle(values.vehicleId);
  const employeeQuery = useEmployee(values.employeeId);

  if (vehicleQuery.isLoading || employeeQuery.isLoading) {
    return <Loading />;
  }

  const vehicle = vehicleQuery.data!;
  const employee = employeeQuery.data!;

  return (
    <>
      {/* Rent */}
      <Title title="Vehicle" />
      {values.rentId && <TextInfo label="Rent ID" value={values.rentId} />}
      <TextInfo label="Vehicle ID" value={values.vehicleId} />
      <TextInfo
        label="Vehicle"
        value={`${vehicle.model.brand.name} ${vehicle.model.name}`}
      />
      <TextInfo label="Employee ID" value={values.employeeId} />
      <TextInfo
        label="Employee"
        value={`${employee.user.firstName} ${employee.user.lastName}`}
      />
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

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-between">
        <TextInfo
          label="Have Scratches"
          value={bool2YesNo(values.haveScratches)}
          className="flex-1"
        />
        <TextInfo
          label="Have Broken Class"
          value={bool2YesNo(values.haveBrokenGlass)}
          className="flex-1"
        />

        <TextInfo
          label="Have CarJack"
          value={bool2YesNo(values.haveCarJack)}
          className="flex-1"
        />
        <TextInfo
          label="Have Tires"
          value={bool2YesNo(values.haveTires)}
          className="flex-1"
        />
      </div>

      <TextInfo label="Tire Status" value={values.tireStatus} />
      <TextInfo label="Status" value={values.status || ""} />
    </>
  );
}
