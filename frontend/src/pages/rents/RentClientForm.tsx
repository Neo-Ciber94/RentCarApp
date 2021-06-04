import { LegalPerson } from "@shared/types";
import { FormikErrors, FormikTouched } from "formik";
import { FormInput, FormSelect } from "src/components";
import { RentFormValues } from ".";

export interface ClientFormProps {
  values: RentFormValues;
  errors: FormikErrors<RentFormValues>;
  touched: FormikTouched<RentFormValues>;
}

export function RentClientForm({ errors, touched, values }: ClientFormProps) {
  return (
    <>
      {values.clientId && <FormInput label="Client ID" name="clientId" />}
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
      <FormInput
        label="Document ID"
        name="documentId"
        error={errors.documentId}
        touched={touched.documentId}
      />
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
      <FormSelect
        label="Legal Person"
        name="legalPerson"
        options={LegalPerson}
        error={errors.legalPerson}
        touched={touched.legalPerson}
      />
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
