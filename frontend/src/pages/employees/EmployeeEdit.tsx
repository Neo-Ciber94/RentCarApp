import { useParams } from "react-router-dom";
import { Container, Loading } from "src/components";
import { useEmployee } from "src/hooks/employeeHooks";
import { EmployeeForm, UpdateEmployee } from "./EmployeeForm";

export function EmployeeEdit() {
  const params = useParams<{ id: string }>();
  const { isLoading, data } = useEmployee(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  const initialValues: UpdateEmployee = {
    type: "update",
    employeeId: data.id,
    userId: data.userId,
    firstName: data.user.firstName,
    lastName: data.user.lastName,
    email: data.user.email,
    comissionPercentage: data.comissionPercentage,
    documentId: data.user.documentId,
    workShift: data.workShift,
  };

  return (
    <Container>
      <EmployeeForm initialValues={initialValues} />
    </Container>
  );
}
