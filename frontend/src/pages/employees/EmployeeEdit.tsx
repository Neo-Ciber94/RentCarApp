import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import { Container, Loading } from "src/components";
import { Services } from "src/services";
import { EmployeeForm, NewEmployee } from "./EmployeeForm";

interface Params {
  id: string;
}

export function EmployeeEdit() {
  const match = useRouteMatch<Params>();
  const { isLoading, data } = useEmployee(Number(match.params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  const initialValues: NewEmployee = {
    firstName: data.user.firstName,
    lastName: data.user.lastName,
    email: data.user.email,
    comissionPercentage: data.comissionPercentage,
    documentId: data.user.documentId,
    workShift: data.workShift,
    password: "", // ignored
  };

  return (
    <Container>
      <EmployeeForm initialValues={initialValues} isEditing={true} />
    </Container>
  );
}

function useEmployee(id: number) {
  return useQuery("employee", () => Services.employees.get(id));
}
