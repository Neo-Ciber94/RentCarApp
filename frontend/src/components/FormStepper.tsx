import { makeStyles, Step, StepLabel, Stepper } from "@material-ui/core";
import { Colors } from "src/layout";

interface FormStepperProps {
  currentStep: number;
  steps: string[];
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
    color: `${Colors.Main} !important`,
  },
});

export function FormStepper(props: FormStepperProps) {
  const classes = stepperStyles();
  const { currentStep, steps } = props;

  return (
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
  );
}
