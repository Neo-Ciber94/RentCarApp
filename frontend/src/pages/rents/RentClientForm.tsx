import { LegalPerson } from "@shared/types";
import { FormikErrors, FormikProps, FormikTouched } from "formik";
import { FormInput, FormSelect, Row } from "src/components";
import { RentFormValues } from ".";

export interface ClientFormProps {
  props: FormikProps<RentFormValues>;
}

export function RentClientForm(clientProps: ClientFormProps) {
  const { errors, touched, values, initialValues } = clientProps.props;

  return (
    <>
      {values.clientId && (
        <FormInput label="Client ID" name="clientId" readOnly />
      )}

      <Row>
        <FormInput
          label="Name"
          name="name"
          error={errors.name}
          touched={touched.name}
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          error={errors.email}
          touched={touched.email}
        />
      </Row>

      <Row>
        <FormInput
          label="Credit Card"
          name="creditCard"
          error={errors.creditCard}
          touched={touched.creditCard}
        />
        <FormInput
          label="Credit Limit"
          name="creditLimit"
          type="number"
          error={errors.creditLimit}
          touched={touched.creditLimit}
        />
      </Row>

      <Row>
        <FormInput
          label="Document ID"
          name="documentId"
          error={errors.documentId}
          touched={touched.documentId}
        />

        <FormSelect
          label="Legal Person"
          name="legalPerson"
          options={LegalPerson}
          error={errors.legalPerson}
          touched={touched.legalPerson}
        />
      </Row>

      <Row>
        {initialValues.employeeId !== 0 && (
          <FormInput label="EmployeeId" name="employeeId" readOnly />
        )}

        {initialValues.employee != null && (
          <FormInput
            label="Employee"
            name="employee"
            readOnly
            value={`${initialValues.employee.user.firstName} ${initialValues.employee.user.lastName}`}
          />
        )}
      </Row>

      {initialValues.rentDate != null && (
        <FormInput label="Rent Date" name="rentDate" readOnly />
      )}
      <Row>
        {initialValues.totalDays != null && (
          <FormInput label="Total Days" name="totalDays" readOnly />
        )}
        {initialValues.totalPrice != null && (
          <FormInput label="Total Price" name="totalPrice" readOnly />
        )}
      </Row>
      <FormInput
        label="Comments"
        name="comments"
        as="textarea"
        error={errors.comments}
        touched={touched.comments}
      />
    </>
  );
}
