import { makeStyles, Step, StepLabel, Stepper } from "@material-ui/core";
import { CREDIT_CARD_LENGTH, DOCUMENT_ID_LENGTH } from "@shared/config";
import { ClientDTO, LegalPerson, VehicleDTO } from "@shared/types";
import { useState } from "react";
import { Container } from "src/components";
import { useAllVehicles } from "src/hooks";
import { Colors } from "src/layout";
import * as yup from "yup";

export interface RentValues extends PartialBy<ClientDTO, "id"> {
  vehicleId: number;
}

interface RentFormProps {
  initialValues: RentValues;
}

const stepperStyles = makeStyles({
  circle: {
    width: 20,
    height: 20,
    color: Colors.MainColor,
  },

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

  vehicleId: yup.number().min(1).required("Vehicle is required"),
});

const steps = ["Vehicle", "Client", "Confirmation"];

export const RentForm: React.FC<RentFormProps> = (props) => {
  const classes = stepperStyles();
  const [currentStep, setStep] = useState(0);
  const [selectedVehicle, setVehicle] = useState<VehicleDTO>();
  const {} = useAllVehicles();

  return (
    <Container>
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

      <div>{getStepContent(currentStep)}</div>
    </Container>
  );
};

function getStepContent(step: number) {
  return <h1>{steps[step]}</h1>;
}
