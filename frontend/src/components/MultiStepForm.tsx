import { Form, Formik, FormikErrors, FormikHelpers, FormikProps } from "formik";
import isPromise from "is-promise";
import { useState } from "react";
import { ButtonProps, FormStepper, MainButton } from ".";

type ReactNode = React.ReactChild | React.ReactFragment | React.ReactPortal;

type ValidateFn<T> = (values: T) => void | object | Promise<FormikErrors<T>>;

interface FormButtomProps extends ButtonProps {
  onClick?: () => void;
  text: string;
  className?: string;
}

type OnMove<T> = (
  step: number,
  formikProps: FormikProps<T>
) => boolean | undefined | void;
type AsyncOnMove<T> = (
  step: number,
  formikProps: FormikProps<T>
) => Promise<boolean | undefined | void>;

export interface FormStep<T> {
  label: string;
  validationSchema?: any;
  validate?: ValidateFn<T>;
  render: (props: FormikProps<T>) => ReactNode;
}

interface MultiStepFormProps<T> {
  initialValues: T;
  submitButtonText?: string;
  cancelButtonText?: string;
  buttonsClassName?: string;
  submitButtonClassName?: string;
  cancelButtonClassName?: string;
  nextButtonClassName?: string;
  prevButtonClassName?: string;
  onNext?: OnMove<T> | AsyncOnMove<T>;
  onPrev?: OnMove<T> | AsyncOnMove<T>;
  onCancel?: () => void;
  onSubmit: (values: T, actions: FormikHelpers<T>) => void;
  steps: FormStep<T>[];
}

export function MultiStepForm<T>({
  onNext,
  onPrev,
  onCancel,
  cancelButtonText,
  cancelButtonClassName,
  submitButtonText,
  submitButtonClassName,
  buttonsClassName,
  nextButtonClassName,
  prevButtonClassName,
  ...props
}: MultiStepFormProps<T>) {
  const [currentStep, setStep] = useState(0);
  const [validationSchema, setValidationSchema] = useState(
    props.steps[0]?.validationSchema
  );
  const [validation, setValidation] = useState(() => props.steps[0]?.validate);
  const stepLabels = props.steps.map((e) => e.label);

  const nextStep = (formik: FormikProps<T>) => {
    onMove(onNext, currentStep, formik, () => {
      console.log(formik.values);
      formik.validateForm().then((errors) => {
        if (Object.keys(errors).length === 0) {
          const nextStep = currentStep + 1;
          const step = props.steps[nextStep];
          setStep(nextStep);

          // Set validation
          setValidationSchema(step?.validationSchema);
          setValidation(step?.validate);
        }
      });
    });
  };

  const prevStep = (formikProps: FormikProps<T>) => {
    onMove(onPrev, currentStep, formikProps, async () => {
      const prevStep = currentStep - 1;
      const step = props.steps[prevStep];
      setStep(prevStep);

      // Set validation
      setValidationSchema(step?.validationSchema);
      setValidation(step?.validate);
    });
  };

  const buttonClassNames = (classNames?: string) => {
    return `${classNames || ""} ${buttonsClassName || ""}`;
  };

  return (
    <>
      <FormStepper currentStep={currentStep} steps={stepLabels} />

      <Formik
        initialValues={props.initialValues}
        validationSchema={validationSchema}
        validate={validation}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => props.onSubmit(values, actions)}
      >
        {(formikProps) => {
          const currentContent = props.steps[currentStep].render(formikProps);
          const showPrevBtn = currentStep > 0;
          const showNextBtn = currentStep < props.steps.length;

          const nextOrSubmitBtn =
            currentStep === props.steps.length - 1 ? (
              <FormButton
                key="submit" // Key needed to allow react know when is submitting
                type="submit"
                text={`${submitButtonText || "Complete"}`}
                className={buttonClassNames(submitButtonClassName)}
              />
            ) : (
              <FormButton
                type="button"
                key="button"
                onClick={() => nextStep(formikProps)}
                text="Next"
                className={buttonClassNames(nextButtonClassName)}
              />
            );

          let prevOrCancelBtn;

          if (showPrevBtn) {
            prevOrCancelBtn = (
              <FormButton
                type="button"
                color="secondary"
                onClick={() => prevStep(formikProps)}
                text="Previous"
                className={buttonClassNames(prevButtonClassName)}
              />
            );
          }

          if (!showPrevBtn && onCancel) {
            prevOrCancelBtn = (
              <FormButton
                type="button"
                color="secondary"
                onClick={onCancel}
                text={cancelButtonText || "Cancel"}
                className={buttonClassNames(cancelButtonClassName)}
              />
            );
          }

          return (
            <Form>
              {currentContent}
              <div className="flex flex-row w-full gap-4 mt-4 justify-end">
                {prevOrCancelBtn}
                {showNextBtn && nextOrSubmitBtn}
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

function onMove<T>(
  fn: OnMove<T> | AsyncOnMove<T> | undefined,
  step: number,
  formikProps: FormikProps<T>,
  success: () => void
) {
  if (fn == null) {
    success();
    return;
  }

  const result = fn(step, formikProps);
  if (isPromise(result)) {
    result.then((v) => {
      if (v) {
        success();
      }
    });
  } else {
    success();
  }
}

function FormButton(props: FormButtomProps) {
  return (
    <MainButton
      {...props}
      className={`w-full sm:w-1/6 ${props.className || ""}`}
      onClick={props.onClick!}
    >
      {props.text}
    </MainButton>
  );
}
