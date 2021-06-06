import { InspectionDTO, TireStatus } from "@shared/types";
import { useParams } from "react-router";
import { Container, FormStep, Loading, MultiStepForm } from "src/components";
import { useRent } from "src/hooks/rentHooks";
import { RentView } from "./RentView";

export function RentReturn() {
  const params = useParams<{ id?: string }>();
  const { isLoading, data } = useRent(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  const initialValues: Partial<InspectionDTO> = {
    haveBrokenGlass: false,
    haveCarJack: false,
    haveScratches: false,
    haveTires: false,
    rentId: data.id,
    frontLeftTire: TireStatus.Normal,
    frontRightTire: TireStatus.Normal,
    backLeftTire: TireStatus.Normal,
    backRightTire: TireStatus.Normal,
    status: "",
  };

  const steps: FormStep<Partial<InspectionDTO>>[] = [
    {
      label: "Rent",
      render: () => <RentView rent={data} />,
    },

    {
      label: "Inspection",
      render: () => <h1></h1>,
    },
  ];

  return (
    <Container className="lg:w-4/6 md:w-5/6">
      <MultiStepForm
        initialValues={initialValues}
        steps={steps}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      />
    </Container>
  );
}
