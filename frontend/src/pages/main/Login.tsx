import { Field, FormikErrors, FormikProps, withFormik } from "formik";

interface FormValues {
  email: string;
  password: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, isValid } = props;

  const emailError = errors.email && touched;
  const passwordError = errors.password && touched;

  return (
    <form>
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
            emailError && "border-red-600"
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
          disabled={isSubmitting || !isValid}
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-sm
        w-full md:w-32"
        >
          Login
        </button>
      </div>
    </form>
  );
};

const LoginForm = withFormik<{}, FormValues>({
  mapPropsToValues: () => {
    return {
      email: "",
      password: "",
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};

    if (values.email.trim().length === 0) {
      errors.email = "Email required";
    }

    if (values.password.length === 0) {
      errors.password = "Password required";
    }

    return errors;
  },

  handleSubmit: ({ email, password }) => {
    console.log(email, password);
  },
})(InnerForm);

export default function Login() {
  return (
    <>
      <h1>Login</h1>
      <div className="flex flex-row justify-center">
        <div className="w-full md:w-4/6 p-6">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
