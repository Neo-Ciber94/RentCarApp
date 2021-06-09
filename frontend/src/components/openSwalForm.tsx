import { FormikHelpers, FormikErrors, FormikProps, Form, Formik } from "formik";
import Swal, { SweetAlertGrow } from "sweetalert2";

import { MainButton, ReactSwal } from ".";

type ReactNode =
  | React.ReactChild
  | React.ReactFragment
  | React.ReactPortal
  | JSX.Element;
type CloseCallback = { close: () => void };

interface FormConfig<T> {
  title: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  initialValues: T;
  validationSchema?: any | (() => any);
  autoFocusCancel?: boolean;
  autoFocusSubmit?: boolean;
  grow?: SweetAlertGrow;
  onSubmit: (values: T, helpers: FormikHelpers<T> & CloseCallback) => void;
  onCancel?: (close: CloseCallback) => void;
  validate?: (values: T) => void | object | Promise<FormikErrors<T>>;
  render: (props: FormikProps<T>) => ReactNode;
}

export function openSwalForm<T>(config: FormConfig<T>) {
  // Function to close the sweet alert
  const closeCallback = () => Swal.close();

  // Classes for the buttons
  const buttonClassNames = "w-full py-3 text-lg";

  // Fire the alert
  return ReactSwal.fire<void>({
    title: config.title,
    showConfirmButton: false,
    customClass: {
      htmlContainer: "text-left",
      container: "text-left",
    },
    grow: config.grow || false,
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
            <Form style={{ textAlign: "left" }}>
              {config.render(props)}

              <div className="flex flex-row w-100 gap-2 mt-10">
                <MainButton
                  type="button"
                  color="secondary"
                  className={buttonClassNames}
                  autoFocus={config.autoFocusCancel || false}
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

                <MainButton
                  type="submit"
                  className={buttonClassNames}
                  autoFocus={config.autoFocusSubmit || false}
                >
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
