import { UserChangePassword } from "@shared/types";
import { Form, Formik, FormikProps } from "formik";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, FormInput, MainButton } from "src/components";
import { AuthContext } from "src/context/AuthContext";
import * as Yup from "yup";
import { goToProfile } from "src/utils/goToProfile";
import { MIN_PASSWORD_LENGTH } from "@shared/config";

interface ChangePasswordValues {
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
          onClick={() => goToProfile(history)}
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
        `Password but have at least ${MIN_PASSWORD_LENGTH} characters`
      )
      .required("New password is required"),

    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .test("match", "Passwords don't match", function () {
        return this.parent.password !== this.parent.confirmPassword;
      }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values, actions) => {
        const changePassword: UserChangePassword = {
          email: authService.currentUser!.email,
          newPassword: values.newPassword,
          oldPassword: values.oldPassword,
        };

        authService.changePassword(changePassword).then((result) => {
          if (result.isOk) {
            goToProfile(history);
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
