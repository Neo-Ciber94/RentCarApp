import { Form, Formik, FormikProps } from "formik";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, FormInput, MainButton } from "src/components";
import { AuthContext } from "src/context/AuthContext";
import * as Yup from "yup";
import { MIN_PASSWORD_LENGTH } from "@shared/config";
import Routes from "src/routes/Routes";

interface ChangePasswordValues {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function ChangePasswordForm(props: {
  props: FormikProps<ChangePasswordValues>;
}) {
  const { touched, errors } = props.props;
  const history = useHistory();

  return (
    <Form>
      <FormInput
        name="oldPassword"
        label="Email"
        autoComplete="current-user"
        hidden
      />
      <FormInput
        name="oldPassword"
        label="Old Password"
        type="password"
        autoComplete="current-password"
        touched={touched.oldPassword}
        error={errors.oldPassword}
      />
      <FormInput
        name="newPassword"
        label="New Password"
        type="password"
        autoComplete="new-password"
        touched={touched.newPassword}
        error={errors.newPassword}
      />
      <FormInput
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        autoComplete="new-password"
        touched={touched.confirmPassword}
        error={errors.confirmPassword}
      />

      <div className="flex flex-row w-100 gap-2">
        <MainButton
          onClick={() => history.push(Routes.profile())}
          type="button"
          color="secondary"
          className="w-full"
        >
          Cancel
        </MainButton>
        <MainButton type="submit" className="w-full">
          Save
        </MainButton>
      </div>
    </Form>
  );
}

export const ChangePassword = observer(() => {
  const authService = useContext(AuthContext);
  const initialValues: ChangePasswordValues = {
    email: authService.currentUser!.email,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const history = useHistory();
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .min(
        MIN_PASSWORD_LENGTH,
        `Passwords but have at least ${MIN_PASSWORD_LENGTH} characters`
      )
      .required("New password is required"),

    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .test(
        "different",
        "New password cannot be the same as old password",
        function () {
          const { newPassword, oldPassword } = this
            .parent as ChangePasswordValues;
          return newPassword !== oldPassword;
        }
      )
      .test("match", "Passwords don't match", function () {
        // prettier-ignore
        const { newPassword, confirmPassword } = this.parent as ChangePasswordValues;
        console.log(this.parent);
        return newPassword === confirmPassword;
      }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values, actions) => {
        authService.changePassword(values).then((result) => {
          if (result.isOk) {
            history.push(Routes.profile());
            actions.setSubmitting(false);
          } else {
            actions.setErrors({
              confirmPassword: result.getError(),
            });
          }
        });
      }}
    >
      {(props) => (
        <Container className="flex flex-row justify-center">
          <div className="w-full md:w-5/6 lg:w-4/6 px-6 py-12">
            <ChangePasswordForm props={props} />
          </div>
        </Container>
      )}
    </Formik>
  );
});
