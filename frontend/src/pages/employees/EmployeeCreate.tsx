import { WorkShift } from "@shared/types";
import { Container } from "src/components";
import { EmployeeForm, NewEmployee } from "./EmployeeForm";

export function EmployeeCreate() {
  const initialValues: NewEmployee = {
    type: "new",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    comissionPercentage: 0,
    documentId: "",
    workShift: WorkShift.Morning,
  };

  return (
    <Container>
      <EmployeeForm initialValues={initialValues} />
    </Container>
  );
}
