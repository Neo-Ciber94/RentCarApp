import { FormikHelpers, FormikErrors, FormikProps, Form, Formik } from "formik";
import Swal from "sweetalert2";
import createWithContent from "sweetalert2-react-content";
import { FormInput, MainButton } from ".";

type ReactNode = React.ReactChild | React.ReactFragment | React.ReactPortal;
type CloseCallback = { close: () => void };

const ReactSwal = createWithContent(Swal);

interface FormConfig<T> {
  title: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  initialValues: T;
  validationSchema?: any | (() => any);
  onSubmit: (values: T, helpers: FormikHelpers<T> & CloseCallback) => void;
  onCancel?: (close: CloseCallback) => void;
  validate?: (values: T) => void | object | Promise<FormikErrors<T>>;
  render: (props: FormikProps<T>) => ReactNode;
}

export function fireForm<T>(config: FormConfig<T>) {
  // Function to close the sweet alert
  const closeCallback = () => Swal.close();

  const buttonClassNames = "w-full py-3";

  // Fire the alert
  return ReactSwal.fire<void>({
    title: config.title,
    //showConfirmButton: false,
    html: (
      <Formik
        initialValues={config.initialValues}
        validate={config.validate}
        validationSchema={config.validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          const helpers = { ...actions, close: closeCallback };
          config.onSubmit(values, helpers);
        }}
      >
        {(props) => {
          return (
            <Form>
              {config.render(props)}

              <div className="flex flex-row w-100 gap-2">
                <MainButton
                  type="button"
                  color="secondary"
                  className={buttonClassNames}
                  onClick={() => {
                    if (config.onCancel) {
                      config.onCancel({ close: closeCallback });
                    } else {
                      closeCallback();
                    }
                  }}
                >
                  {config.cancelButtonText || "Cancel"}
                </MainButton>

                <MainButton type="submit" className={buttonClassNames}>
                  {config.submitButtonText || "Submit"}
                </MainButton>
              </div>
            </Form>
          );
        }}
      </Formik>
    ),
  });
}
