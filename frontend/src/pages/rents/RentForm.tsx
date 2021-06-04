import { VehicleDTO } from "@shared/types";
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { ButtonProps, Container, MainButton } from "src/components";
import { FormStepper } from "src/components/FormStepper";
import { RentFormValues, RentView } from ".";
import { RentClientForm } from "./RentClientForm";
import { RentInspectionForm } from "./RentInspectionForm";
import { RentVehicleSelection } from "./RentVehicleSelection";
import {
  inspectionValidationSchema,
  rentValidationSchema,
} from "./validationSchemas";

type FormButtomProps = ButtonProps & { onClick?: () => void; text: string };

interface RentFormProps {
  initialValues: RentFormValues;
}

const steps = ["Vehicle", "Client", "Inspection", "Confirmation"];

export const RentForm: React.FC<RentFormProps> = ({ initialValues }) => {
  const [currentStep, setStep] = useState(0);
  const [selectedVehicle, setVehicle] = useState<VehicleDTO>();

  const nextStep = async (formikProps: FormikProps<RentFormValues>) => {
    let next = false;
    console.log(formikProps.values);

    if (currentStep === 0) {
      formikProps.validateField("vehicleId");
      next = !!selectedVehicle?.id;
    }

    if (currentStep >= 1) {
      await formikProps.validateForm();
      next = formikProps.isValid;
    }

    if (next) {
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
        validationSchema={getValidationSchema(currentStep)}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        {(formikProps) => {
          const { errors, touched, values } = formikProps;

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
                return (
                  <RentClientForm
                    errors={errors}
                    touched={touched}
                    values={values}
                  />
                );
              case 2:
                return (
                  <RentInspectionForm
                    errors={errors}
                    touched={touched}
                    values={values}
                  />
                );
              case 3:
                return <RentView values={values} />;
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

function getValidationSchema(step: number) {
  if (step === 0 || step === 1) {
    return rentValidationSchema;
  }

  if (step === 2) {
    return inspectionValidationSchema;
  }

  return undefined;
}

function FormButton(props: FormButtomProps) {
  return (
    <MainButton {...props} className="w-full  sm:w-1/6" onClick={props.onClick}>
      {props.text}
    </MainButton>
  );
}
