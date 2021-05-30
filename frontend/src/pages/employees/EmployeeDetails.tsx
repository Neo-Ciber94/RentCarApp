import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import { Container, LinkButton, Loading, TextWithLabel } from "src/components";
import { Routes } from "src/layout";
import { Services } from "src/services";

interface Params {
  id: string;
}

export function EmployeeDetails() {
  const match = useRouteMatch<Params>();
  const { isLoading, data } = useEmployee(Number(match.params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  return (
    <Container>
      <TextWithLabel label="ID" value={data.id} />
      <TextWithLabel label="First Name" value={data.user.firstName} />
      <TextWithLabel label="Last Name" value={data.user.lastName} />
      <TextWithLabel label="Document ID" value={data.user.documentId} />
      <TextWithLabel label="Email" value={data.user.email} />
      <TextWithLabel label="Role" value={data.user.role} />
      <TextWithLabel
        label="Comission Percentage"
        value={data.comissionPercentage}
      />
      <TextWithLabel label="Work Shift" value={data.workShift} />
      <TextWithLabel label="Created At" value={data.user.createdAt} />
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

function useEmployee(id: number) {
  return useQuery("employee", () => Services.employees.get(id));
}
