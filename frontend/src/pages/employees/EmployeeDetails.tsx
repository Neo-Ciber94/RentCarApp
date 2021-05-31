import { useParams } from "react-router-dom";
import { Container, LinkButton, Loading, TextWithLabel } from "src/components";
import { Routes } from "src/layout";
import { useEmployee } from "./hooks";

interface Params {
  id: string;
}

export function EmployeeDetails() {
  const params = useParams<Params>();
  const { isLoading, data } = useEmployee(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  return (
    <Container className="lg:w-3/6 md:w-5/6">
      <TextField label="ID" value={data.id} />
      <TextField label="First Name" value={data.user.firstName} />
      <TextField label="Last Name" value={data.user.lastName} />
      <TextField label="Document ID" value={data.user.documentId} />
      <TextField label="Email" value={data.user.email} />
      <TextField label="Role" value={data.user.role} />
      <TextField
        label="Comission Percentage"
        value={data.comissionPercentage}
      />
      <TextField label="Work Shift" value={data.workShift} />
      <TextField label="Created At" value={data.user.createdAt} />
      <div className="flex flex-row gap-4 mt-4">
        <LinkButton
          className="w-full"
          color="secondary"
          to={Routes.employees.path}
        >
          Cancel
        </LinkButton>
        <LinkButton
          className="w-full"
          to={`${Routes.employees.path}/${data.id}/edit`}
        >
          Edit
        </LinkButton>
      </div>
    </Container>
  );
}

function TextField(props: { label: string; value: string | number | Date }) {
  return (
    <div className="mb-4">
      <TextWithLabel label={props.label} value={props.value} />
      <hr />
    </div>
  );
}
