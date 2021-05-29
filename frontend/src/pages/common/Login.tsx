import { Field, FormikErrors, FormikProps, Form, Formik } from "formik";
import { useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "src/context/AuthContext";
import { observer } from "mobx-react-lite";

interface FormValues {
  email: string;
  password: string;
}

function LoginForm(props: { props: FormikProps<FormValues> }) {
  const { touched, errors, isSubmitting } = props.props;

  const emailError = errors.email && touched.email;
  const passwordError = errors.password && touched.password;

  return (
    <Form>
      {/* Email */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <Field
          type="text"
          name="email"
          autoComplete="current-username"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.email && touched && "border-red-600"
          }`}
        />
        {emailError && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <Field
          type="password"
          name="password"
          autoComplete="current-password"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            passwordError && "border-red-600"
          }`}
        />
        {passwordError && (
          <p className="text-red-600 text-xs">{errors.password}</p>
        )}
      </div>

      {/* Button */}
      <div className="text-right">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-sm
        w-full md:w-32"
        >
          Login
        </button>
      </div>
    </Form>
  );
}

export const Login = observer(() => {
  const initialValues: FormValues = { email: "", password: "" };
  const history = useHistory();
  const authService = useContext(AuthContext);

  if (authService.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      validate={(values) => {
        const errors: FormikErrors<FormValues> = {};
        if (values.email?.trim().length === 0) {
          errors.email = "Email is required";
        }

        if (values.password?.trim().length === 0) {
          errors.password = "Password is required";
        }

        return errors;
      }}
      onSubmit={async (values, actions) => {
        try {
          const result = await authService.login(values);

          if (result.isOk) {
            history.push("/");
          } else {
            actions.setErrors({
              password: result.getError(),
            });
          }
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {(props) => (
        <>
          <div className="flex flex-row justify-center">
            <div className="w-full md:w-3/6 px-6 py-12">
              <LoginForm props={props} />
            </div>
          </div>
        </>
      )}
    </Formik>
  );
});
