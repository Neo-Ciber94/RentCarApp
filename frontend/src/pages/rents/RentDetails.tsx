import { useParams } from "react-router-dom";
import { Container, Loading, MainButton, TextInfo } from "src/components";
import { useRent } from "src/hooks/rentHooks";

export function RentDetails() {
  const params = useParams<{ id: string }>();
  const { isLoading, data } = useRent(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  return (
    <Container className="lg:w-3/6 md:w-5/6">
      <TextInfo label="ID" value={data.id} />
      <TextInfo
        label="Vehicle"
        value={`${data.vehicle.model.name} ${data.vehicle.model.name}`}
      />
      <TextInfo label="Client" value={`${data.client.name}`} />
      <TextInfo
        label="Employee"
        value={`${data.employee.user.firstName} ${data.employee.user.lastName}`}
      />
      <TextInfo label="Rent Date" value={`${data.rentDate}`} />
      <TextInfo label="Return Date" value={`${data.returnDate}`} />
      <TextInfo label="Rent Days" value={`${data.totalDays || 0}`} />
      <TextInfo label="Comments" value={`${data.comments}`} />

      <div className="mb-4">
        <MainButton color="secondary" className="w-full">
          Back
        </MainButton>
      </div>
    </Container>
  );
}
