import { makeStyles, Step, StepLabel, Stepper } from "@material-ui/core";
import { CREDIT_CARD_LENGTH, DOCUMENT_ID_LENGTH } from "@shared/config";
import { ClientDTO, LegalPerson, VehicleDTO } from "@shared/types";
import { Form, Formik, FormikErrors, FormikProps, FormikTouched } from "formik";
import { useState } from "react";
import {
  ButtonProps,
  Container,
  FormInput,
  FormSelect,
  Loading,
  MainButton,
  withCustomForm,
} from "src/components";
import { useAllVehicles } from "src/hooks";
import { Colors } from "src/layout";
import * as yup from "yup";
import { VehicleCard } from "..";

export interface RentValues extends PartialBy<ClientDTO, "id"> {
  vehicleId: number;
}

type FormButtomProps = ButtonProps & { onClick?: () => void; text: string };

interface RentFormProps {
  initialValues: RentValues;
}

interface VehicleSelectionProps {
  onSelect: (vehicle: VehicleDTO) => void;
  selected?: VehicleDTO;
  errors: FormikErrors<RentValues>;
}

interface ClientFormProps {
  errors: FormikErrors<RentValues>;
  touched: FormikTouched<RentValues>;
}

const stepperStyles = makeStyles({
  icon: {
    width: 30,
    height: 30,
    borderRadius: "50%",
  },

  completed: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    color: `${Colors.MainColor} !important`,
  },
});

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
});

const steps = ["Vehicle", "Client", "Confirmation"];

export const RentForm: React.FC<RentFormProps> = ({ initialValues }) => {
  const classes = stepperStyles();
  const [currentStep, setStep] = useState(0);
  const [selectedVehicle, setVehicle] = useState<VehicleDTO>();

  const nextStep = async (formikProps: FormikProps<RentValues>) => {
    let next = false;
    if (currentStep === 0) {
      // Formik don't validate if the field don't exist
      formikProps.setFieldValue("vehicleId", selectedVehicle?.id);
      formikProps.validateField("vehicleId");
      next = !!selectedVehicle?.id;
    }

    if (currentStep === 1) {
      await formikProps.validateForm();
      next = formikProps.isValid;
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
      <Stepper activeStep={currentStep}>
        {steps.map((label, index) => {
          const completed = currentStep > index;
          const labelClass =
            index <= currentStep ? classes.completed : classes.icon;

          return (
            <Step key={label} completed={completed}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    root: labelClass,
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      >
        {(formikProps) => {
          const { errors, touched } = formikProps;

          const currentContent = () => {
            switch (currentStep) {
              case 0:
                return (
                  <VehicleSelection
                    onSelect={setVehicle}
                    selected={selectedVehicle}
                    errors={errors}
                  />
                );
              case 1:
                return <ClientForm errors={errors} touched={touched} />;
              case 2:
                return <h1>Completed</h1>;
              default:
                throw new Error("Invalid step");
            }
          };

          const formButton =
            currentStep === steps.length - 1 ? (
              <FormButton color="info" type="submit" text="Submit" />
            ) : (
              <FormButton
                type="button"
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
                  <FormButton type="button" onClick={prevStep} text="Prev" />
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

function ClientForm({ errors, touched }: ClientFormProps) {
  return (
    <>
      {/* <FormInput label="ID" name="id" /> */}
      <FormInput
        label="Name"
        name="name"
        error={errors.name}
        touched={touched.name}
      />
      <FormInput
        label="Email"
        name="email"
        type="email"
        error={errors.email}
        touched={touched.email}
      />
      <FormInput
        label="Document ID"
        name="documentId"
        error={errors.documentId}
        touched={touched.documentId}
      />
      <FormInput
        label="Credit Card"
        name="creditCard"
        error={errors.creditCard}
        touched={touched.creditCard}
      />
      <FormInput
        label="Credit Limit"
        name="creditLimit"
        type="number"
        error={errors.creditLimit}
        touched={touched.creditLimit}
      />
      <FormSelect
        label="Legal Person"
        name="legalPerson"
        options={LegalPerson}
        error={errors.legalPerson}
        touched={touched.legalPerson}
      />
    </>
  );
}

function VehicleSelection({ errors, ...props }: VehicleSelectionProps) {
  const { isLoading, data = [] } = useAllVehicles();

  if (isLoading) {
    return <Loading />;
  }

  const vehicles = data.map((e, index) => {
    const isSelected = props.selected?.id === e.id;
    return (
      <VehicleCard
        key={index}
        vehicle={e}
        onClick={() => props.onSelect(e)}
        className={`cursor-pointer ${
          isSelected ? "ring-4 ring-red-500 ring-opacity-90" : ""
        }`}
      />
    );
  });

  return (
    <Container className="lg:max-w-5xl">
      <FormInput label="Vehicle" name="vehicleId" hidden />
      <div className="flex flex-row flex-wrap gap-4">{vehicles}</div>
      {errors.vehicleId && (
        <p className="text-red-500 text-xs mt-4">{errors.vehicleId}</p>
      )}
    </Container>
  );
}
