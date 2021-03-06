import { InspectionDTO, TireStatus } from "@shared/types";
import { useHistory, useParams } from "react-router";
import { Container, FormStep, Loading, MultiStepForm } from "src/components";
import { useRent } from "src/hooks/rentHooks";
import { Services } from "src/services";
import { RentInfo } from "./RentInfo";
import { InspectionForm } from "src/pages/inspections";
import NotFound from "../common/NotFound";
import Routes from "src/routes/Routes";

type InspectionEntity = Partial<InspectionDTO>;

export function RentReturn() {
  const params = useParams<{ id?: string }>();
  const history = useHistory();
  const { isLoading, data } = useRent(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  // Its already returned
  if (data.returnDate) {
    return <NotFound />;
  }

  const initialValues: InspectionEntity = {
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

  const steps: FormStep<InspectionEntity>[] = [
    {
      label: "Review Rent",
      render: () => <RentInfo rent={data} />,
    },

    {
      label: "Inspection",
      render: ({ errors, touched, initialValues }) => (
        <InspectionForm
          initialValues={initialValues}
          errors={errors}
          touched={touched}
        />
      ),
    },
  ];

  return (
    <Container className="lg:w-4/6 md:w-5/6">
      <MultiStepForm
        initialValues={initialValues}
        buttonsClassName="text-sm"
        steps={steps}
        submitButtonText="Return Vehicle"
        onSubmit={async (values, actions) => {
          await Services.rents.rentReturn({
            rentId: data.id,
          });

          await Services.inspections.create({
            ...values,
            rentId: data.id,
          });

          actions.setSubmitting(false);
          history.push(Routes.rents());
        }}
      />
    </Container>
  );
}
