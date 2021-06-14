import { Form, Formik, FormikErrors, FormikHelpers, FormikProps } from "formik";
import { Container, MainButton } from ".";

type ReactNode = React.ReactChild | React.ReactFragment | React.ReactPortal;
type HTMLFormProps = React.FormHTMLAttributes<HTMLFormElement>;

interface FormConfig<T> {
  initialValues: T;
  validationSchema?: any | (() => any);
  formProps?: HTMLFormProps;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void;
  onCancel: () => void;
  validate?: (values: T) => void | object | Promise<FormikErrors<T>>;
  render: (props: FormikProps<T>) => ReactNode;
}

export function withCustomForm<T>(props: FormConfig<T>) {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      validate={props.validate}
      validationSchema={props.validationSchema}
    >
      {(formikProps) => {
        return (
          <Container className="flex flex-row justify-center">
            <div className="w-full md:w-5/6 lg:w-4/6 px-6 py-3">
              {/* Actual form  */}
              <Form {...props.formProps}>
                {props.render(formikProps)}
                <div className="flex flex-row w-100 gap-2 mt-10">
                  {/* Buttons  */}
                  <MainButton
                    onClick={props.onCancel}
                    type="button"
                    color="secondary"
                    className="w-full text-lg"
                  >
                    Cancel
                  </MainButton>
                  <MainButton type="submit" className="w-full text-lg">
                    Save
                  </MainButton>
                </div>
              </Form>
            </div>
          </Container>
        );
      }}
    </Formik>
  );
}
