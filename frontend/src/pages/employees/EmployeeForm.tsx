import { DOCUMENT_ID_LENGTH, MIN_PASSWORD_LENGTH } from "@shared/config";
import { EmployeeDTO, UserSignup, UserUpdate, WorkShift } from "@shared/types";
import { FormikErrors, FormikTouched } from "formik";
import { useContext, useState } from "react";

import { useHistory, useRouteMatch } from "react-router-dom";
import {
  Container,
  FormInput,
  FormSelect,
  withCustomForm,
} from "src/components";
import { AuthContext } from "src/context/AuthContext";
import { Routes } from "src/layout";
import { AuthService, Services } from "src/services";
import * as yup from "yup";
import { TestConfig } from "yup";

export interface NewEmployee extends UserSignup {
  type: "new";
  employeeId?: number;
  comissionPercentage: number;
  workShift: WorkShift;
}

export interface UpdateEmployee extends UserUpdate {
  type: "update";
  userId: number;
  employeeId: number;
  comissionPercentage: number;
  workShift: WorkShift;
}

type EmployeeEntity = NewEmployee | UpdateEmployee;

interface EmployeeFormProps {
  initialValues: EmployeeEntity;
}

const newEmployeeShchema: yup.SchemaOf<Omit<NewEmployee, "type">> = yup.object({
  employeeId: yup.number().optional(),

  firstName: yup
    .string()
    .required("First name is required")
    .test(noBlank("noblank", "First name cannot be empty")),

  lastName: yup
    .string()
    .required("Last name is required")
    .test(noBlank("noblank", "Last name cannot be empty")),

  documentId: yup
    .string()
    .required("Document ID is required")
    .min(
      DOCUMENT_ID_LENGTH,
      `Document ID must have at least ${DOCUMENT_ID_LENGTH} characters`
    ),

  email: yup.string().required("Email is required").email("Expected an email"),

  comissionPercentage: yup
    .number()
    .required("Number is required")
    .min(0, "Commision percentage cannot be negative"),

  password: yup
    .string()
    .required("Password is required")
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must have at least ${MIN_PASSWORD_LENGTH} characters`
    ),

  workShift: yup
    .mixed<WorkShift>()
    .required("WorkShift is required")
    .oneOf(Object.values(WorkShift), "Invalid value"),
});

const updateEmployeeShchema: yup.SchemaOf<Omit<UpdateEmployee, "type">> =
  yup.object({
    employeeId: yup.number().required(),

    userId: yup.number().required(),

    firstName: yup
      .string()
      .required("First name is required")
      .test(noBlank("noblank", "First name cannot be empty")),

    lastName: yup
      .string()
      .required("Last name is required")
      .test(noBlank("noblank", "Last name cannot be empty")),

    documentId: yup
      .string()
      .required("Document ID is required")
      .min(
        DOCUMENT_ID_LENGTH,
        `Document ID must have at least ${DOCUMENT_ID_LENGTH} characters`
      ),

    email: yup
      .string()
      .required("Email is required")
      .email("Expected an email"),

    comissionPercentage: yup
      .number()
      .required("Number is required")
      .min(0, "Commision percentage cannot be negative"),

    workShift: yup
      .mixed<WorkShift>()
      .required("WorkShift is required")
      .oneOf(Object.values(WorkShift), "Invalid value"),
  });

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialValues,
}) => {
  const [error, setError] = useState<string | null>(null);
  const authService = useContext(AuthContext);
  const history = useHistory();
  const match = useRouteMatch();

  const isEditing = match.url.endsWith("edit");

  const validationSchema =
    initialValues.type === "update"
      ? updateEmployeeShchema
      : newEmployeeShchema;

  return (
    <Container>
      {withCustomForm({
        initialValues,
        validationSchema,
        onCancel: () => history.push(Routes.employees.path),
        onSubmit: async (values, actions) => {
          console.log(values);

          if (initialValues.type === "update") {
            await updateEmployee(
              values as UpdateEmployee,
              authService,
              setError
            );
          } else {
            await addEmployee(values as NewEmployee, authService, setError);
          }

          history.push(Routes.employees.path);
          actions.setSubmitting(false);
        },
        render: ({ errors, touched }) => (
          <>
            {initialValues.employeeId && (
              <FormInput label="ID" name="employeeId" readOnly />
            )}
            <FormInput
              label="First Name"
              name="firstName"
              error={errors.firstName}
              touched={touched.firstName}
            />
            <FormInput
              label="Last Name"
              name="lastName"
              error={errors.firstName}
              touched={touched.firstName}
            />
            <FormInput
              label="Email"
              name="email"
              autoComplete="username"
              readOnly={isEditing}
              error={errors.email}
              touched={touched.email}
            />
            <FormInput
              label="Document ID"
              name="documentId"
              autoComplete="off"
              error={errors.documentId}
              touched={touched.documentId}
            />
            <FormInput
              label="Comission Percentage"
              name="comissionPercentage"
              type="number"
              step={0.1}
              error={errors.comissionPercentage}
              touched={touched.comissionPercentage}
            />

            {initialValues.type === "new" && (
              <FormInput
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                error={(errors as FormikErrors<NewEmployee>).password}
                touched={(touched as FormikTouched<NewEmployee>).password}
              />
            )}
            <FormSelect
              label="WorkShift"
              name="workShift"
              options={WorkShift}
              error={errors.workShift}
              touched={touched.workShift}
            />

            {error && <p className="text-red-500 text-xs mt-4">{errors}</p>}
          </>
        ),
      })}
    </Container>
  );
};

async function updateEmployee(
  values: UpdateEmployee,
  authService: AuthService,
  setError: (s: string | null) => void
) {
  console.log(values);
  const userUpdate: UserUpdate = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    documentId: values.documentId,
  };

  const employee: Partial<EmployeeDTO> = {
    id: values.employeeId,
    userId: values.userId,
    comissionPercentage: values.comissionPercentage,
    workShift: values.workShift,
  };

  const result = await authService.update(userUpdate);

  if (result.isError) {
    setError(result.getError());
  } else {
    const newEmployee = await Services.employees.update(
      employee as EmployeeDTO
    );

    console.log(newEmployee);
  }
}

async function addEmployee(
  values: NewEmployee,
  authService: AuthService,
  setError: (s: string | null) => void
) {
  const userSignup: UserSignup = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    documentId: values.documentId,
  };
  const result = await authService.signup(userSignup);

  if (result.isError) {
    setError(result.getError());
  } else {
    setError(null);

    const newUser = result.get();
    const employee: Partial<EmployeeDTO> = {
      userId: newUser.id,
      comissionPercentage: values.comissionPercentage,
      workShift: values.workShift,
    };

    const newEmployee = await Services.employees.create(
      employee as EmployeeDTO
    );

    console.log(newEmployee);
  }
}

function noBlank(name: string, message: string): TestConfig<any> {
  return {
    name,
    message,
    test: (value: string) => value.trim().length > 0,
  };
}
