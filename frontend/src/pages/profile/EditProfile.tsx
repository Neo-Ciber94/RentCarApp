import { UserUpdate } from "@shared/types";
import { Form, Formik, FormikProps } from "formik";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, FormInput, MainButton } from "src/components";
import { AuthContext } from "src/context/AuthContext";
import * as Yup from "yup";
import { DOCUMENT_ID_LENGTH } from "@shared/config";
import Routes from "src/routes/Routes";

function EditProfileForm(props: { props: FormikProps<UserUpdate> }) {
  const { touched, errors } = props.props;
  const history = useHistory();

  return (
    <Form>
      <FormInput
        name="firstName"
        label="First Name"
        touched={touched.firstName}
        error={errors.firstName}
      />
      <FormInput
        name="lastName"
        label="Last Name"
        touched={touched.lastName}
        error={errors.lastName}
      />
      <FormInput name="email" label="Email" type="email" readOnly />
      <FormInput
        name="documentId"
        label="Document ID"
        touched={touched.documentId}
        error={errors.documentId}
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

export const EditProfile = observer(() => {
  const authService = useContext(AuthContext);
  const initialValues: UserUpdate = authService.currentUser!;
  const history = useHistory();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last Name is required"),
    documentId: Yup.string()
      .length(
        DOCUMENT_ID_LENGTH,
        `Document ID requires ${DOCUMENT_ID_LENGTH} characters`
      )
      .required("Document ID is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        authService.update(values).then(() => {
          history.push(Routes.profile());
          actions.setSubmitting(false);
        });
      }}
    >
      {(props) => (
        <Container className="flex flex-row justify-center">
          <div className="w-full md:w-5/6 lg:w-4/6 px-6 py-12">
            <EditProfileForm props={props} />
          </div>
        </Container>
      )}
    </Formik>
  );
});
