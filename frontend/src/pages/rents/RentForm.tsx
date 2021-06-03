import { CREDIT_CARD_LENGTH, DOCUMENT_ID_LENGTH } from "@shared/config";
import {
  ClientDTO,
  InspectionDTO,
  LegalPerson,
  VehicleDTO,
} from "@shared/types";
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { ButtonProps, Container, MainButton } from "src/components";
import { FormStepper } from "src/components/FormStepper";
import * as yup from "yup";
import { RentClientForm } from "./RentClientForm";
import { RentInspectionForm } from "./RentInspectionForm";
import { RentVehicleSelection } from "./RentVehicleSelection";

export interface RentValues extends PartialBy<ClientDTO, "id"> {
  vehicleId: number;
  inspection: InspectionDTO;
}

type FormButtomProps = ButtonProps & { onClick?: () => void; text: string };

interface RentFormProps {
  initialValues: RentValues;
}

const validationSchema: yup.SchemaOf<RentValues> = yup.object({
  id: yup.number().optional(),

  name: yup.string().required("Name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  creditCard: yup
    .string()
    .required("Credit Card is required")
    .length(
      CREDIT_CARD_LENGTH,
      `Credit card expect ${CREDIT_CARD_LENGTH} digits`
    ),

  creditLimit: yup
    .number()
    .optional()
    .min(1000, "Min credit limit is 1000 RD$"),

  documentId: yup
    .string()
    .required("Document ID is required")
    .length(
      DOCUMENT_ID_LENGTH,
      `Document ID expected ${DOCUMENT_ID_LENGTH} digits`
    ),

  legalPerson: yup
    .mixed<LegalPerson>()
    .oneOf(Object.values(LegalPerson))
    .required("Legal Person type is required"),

  vehicleId: yup
    .number()
    .min(1, "Select a vehicle")
    .required("Vehicle is required"),

  // TODO
  inspection: yup.object({}) as yup.SchemaOf<InspectionDTO>,
});

const steps = ["Vehicle", "Client", "Inspection", "Confirmation"];

export const RentForm: React.FC<RentFormProps> = ({ initialValues }) => {
  const [currentStep, setStep] = useState(0);
  const [selectedVehicle, setVehicle] = useState<VehicleDTO>();

  const nextStep = async (formikProps: FormikProps<RentValues>) => {
    let next = false;

    if (currentStep === 0) {
      formikProps.validateField("vehicleId");
      console.log(formikProps);
      next = !!selectedVehicle?.id;
    }

    if (currentStep === 1) {
      await formikProps.validateForm();
      next = formikProps.isValid;
    }

    if (currentStep === 2) {
      // Validates inspection
    }

    console.log(next);
    if (next === true) {
      setStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setStep(currentStep - 1);
  };

  return (
    <Container className="lg:max-w-5xl">
      <FormStepper currentStep={currentStep} steps={steps} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        {(formikProps) => {
          const { errors, touched } = formikProps;

          const currentContent = () => {
            switch (currentStep) {
              case 0:
                return (
                  <RentVehicleSelection
                    onSelect={(v) => {
                      setVehicle(v);
                      formikProps.setFieldValue("vehicleId", v.id);
                    }}
                    selected={selectedVehicle}
                    errors={errors}
                  />
                );
              case 1:
                return <RentClientForm errors={errors} touched={touched} />;
              case 2:
                return <RentInspectionForm errors={errors} touched={touched} />;
              case 3:
                return <h1>Completed</h1>;
              default:
                throw new Error("Invalid step");
            }
          };

          const formButton =
            currentStep === steps.length - 1 ? (
              <FormButton
                key="submit" // Key needed to allow react know when is submitting
                type="submit"
                text="Complete"
              />
            ) : (
              <FormButton
                type="button"
                key="button"
                onClick={() => nextStep(formikProps)}
                text="Next"
              />
            );

          const showPrevBtn = currentStep > 0;
          const showNextBtn = currentStep < steps.length;

          return (
            <Form>
              {currentContent()}
              <div className="flex flex-row w-full gap-4 mt-4 justify-end">
                {showPrevBtn && (
                  <FormButton
                    type="button"
                    color="secondary"
                    onClick={prevStep}
                    text="Previous"
                  />
                )}
                {showNextBtn && formButton}
              </div>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

function FormButton(props: FormButtomProps) {
  return (
    <MainButton {...props} className="w-full  sm:w-1/6" onClick={props.onClick}>
      {props.text}
    </MainButton>
  );
}
