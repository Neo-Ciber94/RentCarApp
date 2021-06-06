import { useParams } from "react-router-dom";
import { Container, Loading } from "src/components";
import { BottomButtonGroup } from "src/components/BottomButtonGroup";
import { TextInfo } from "src/components/TextInfo";
import { useEmployee } from "src/hooks/employeeHooks";
import { Routes } from "src/layout";

export function EmployeeDetails() {
  const params = useParams<{ id: string }>();
  const { isLoading, data } = useEmployee(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  return (
    <Container className="lg:w-4/6 md:w-5/6">
      <TextInfo label="ID" value={data.id} />
      <TextInfo label="First Name" value={data.user.firstName} />
      <TextInfo label="Last Name" value={data.user.lastName} />
      <TextInfo label="Document ID" value={data.user.documentId} />
      <TextInfo label="Email" value={data.user.email} />
      <TextInfo label="Role" value={data.user.role} />
      <TextInfo label="Comission Percentage" value={data.comissionPercentage} />
      <TextInfo label="Work Shift" value={data.workShift} />
      <TextInfo label="Created At" value={data.user.createdAt} />
      <BottomButtonGroup
        cancelPath={Routes.employees.path}
        confirmPath={`${Routes.employees.path}/${data.id}/edit`}
        confirmText="Edit"
      />
    </Container>
  );
}
