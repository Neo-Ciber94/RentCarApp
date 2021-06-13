import { GearBox, UserRole, VehicleDTO } from "@shared/types";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import {
  FormCheckbox,
  FormInput,
  FormSelect,
  Loading,
  withCustomForm,
} from "src/components";
import { AuthContext } from "src/context/AuthContext";
import { Routes } from "src/layout";
import { Services } from "src/services";
import * as yup from "yup";

interface VehicleFormProps {
  initialValues: Partial<VehicleDTO>;
}

const validationSchema: yup.SchemaOf<Partial<VehicleDTO>> = yup.object({
  id: yup.number().optional(),

  modelId: yup.number().min(1, "Model is required"),

  fuelId: yup.number().min(1, "Fuel is required"),

  rentPrice: yup
    .number()
    .required("Rent price is required")
    .min(1, "Rent price must be greater than 0"),

  image: yup.string().optional(),

  gearBox: yup.mixed<GearBox>().required().oneOf(Object.values(GearBox)),

  chassisNumber: yup.string().required("Chassis number is required"),

  engineNumber: yup.string().required("Engine number is required"),

  description: yup.string().optional(),

  licensePlate: yup.string().required("License plate number is required"),

  // Fields bellow are ignored
  isAvailable: yup.bool().optional(),

  model: yup.mixed().optional(),

  fuel: yup.mixed().optional(),

  status: yup.string().optional(),
});

export const VehicleForm = observer<VehicleFormProps>(({ initialValues }) => {
  const authService = useContext(AuthContext);
  const history = useHistory();
  const modelsResult = useModels();
  const fuelsResult = useFuels();

  const isAdmin = authService.currentUser?.role === UserRole.Admin;

  if (modelsResult.isLoading || fuelsResult.isLoading) {
    return <Loading />;
  }

  return withCustomForm({
    initialValues: initialValues,
    validationSchema,
    onCancel: () => history.push(Routes.vehicles.path),
    onSubmit: async (values, actions) => {
      console.log(values);
      if ("id" in values) {
        const result = await Services.vehicles.update(values as VehicleDTO);
        console.log(result);
      } else {
        const result = await Services.vehicles.create(values as VehicleDTO);
        console.log(result);
      }

      history.push(Routes.vehicles.path);
      actions.setSubmitting(false);
    },
    render: ({ errors, touched }) => {
      const models = modelsResult.data?.map((e) => ({
        label: `${e.brand.name} ${e.name}`,
        value: e.id,
      }));

      const fuels = fuelsResult.data?.map((e) => ({
        label: e.name,
        value: e.id,
      }));

      return (
        <>
          {initialValues.id && <FormInput label="ID" name="id" readOnly />}
          <FormSelect
            label="Model"
            name="modelId"
            options={models || []}
            error={errors.modelId}
            touched={touched.modelId}
            defaultOption={"Select an model..."}
          />
          <FormSelect
            label="Fuel"
            name="fuelId"
            options={fuels || []}
            error={errors.fuelId}
            touched={touched.fuelId}
            defaultOption={"Select a fuel..."}
          />
          <FormInput
            label="Rent Price"
            name="rentPrice"
            type="number"
            error={errors.rentPrice}
            touched={touched.rentPrice}
          />
          {isAdmin && <FormCheckbox label="Is Available" name="isAvailable" />}
          <FormInput
            label="Engine Number"
            name="engineNumber"
            error={errors.engineNumber}
            touched={touched.engineNumber}
          />
          <FormInput
            label="Chassis Number"
            name="chassisNumber"
            error={errors.chassisNumber}
            touched={touched.chassisNumber}
          />
          <FormInput
            label="License Plate Number"
            name="licensePlate"
            error={errors.licensePlate}
            touched={touched.licensePlate}
          />
          <FormSelect
            label="GearBox"
            name="gearBox"
            options={GearBox}
            error={errors.gearBox}
            touched={touched.gearBox}
          />
          {/* <FormInput label="Status" name="status" /> */}
          <FormInput
            label="Description"
            name="description"
            as="textarea"
            error={errors.description}
            touched={touched.description}
          />
        </>
      );
    },
  });
});

function useModels() {
  return useQuery("models", () => {
    return Services.models.getAll();
  });
}

function useFuels() {
  return useQuery("fuels", () => {
    return Services.fuels.getAll();
  });
}
