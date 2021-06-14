import { GearBox, UserRole, VehicleDTO } from "@shared/types";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import {
  FormInput,
  FormImageFile,
  FormSelect,
  Loading,
  withCustomForm,
  FormCheckbox,
} from "src/components";
import { AuthContext } from "src/context/AuthContext";
import { Routes } from "src/layout";
import { Services } from "src/services";
import { getImage } from "src/utils/getImage";
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

  image: yup.mixed().optional(),

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
  const history = useHistory();
  const authService = useContext(AuthContext);
  const modelsResult = useModels();
  const fuelsResult = useFuels();

  if (modelsResult.isLoading || fuelsResult.isLoading) {
    return <Loading />;
  }

  const isAdmin = authService.currentUser?.role === UserRole.Admin;

  return withCustomForm({
    initialValues: initialValues,
    validationSchema,
    formProps: {
      encType: "multipart/form-data",
    },
    onCancel: () => history.push(Routes.vehicles.path),
    onSubmit: async (values, actions) => {
      const formData = new FormData();
      for (const key in values) {
        const value = (values as any)[key];
        if (value) {
          formData.append(key, value);
        }
      }

      if ("id" in values) {
        const result = await Services.vehicles.update(
          formData as unknown as VehicleDTO
        );
        console.log(result);
      } else {
        const result = await Services.vehicles.create(
          formData as unknown as VehicleDTO
        );
        console.log(result);
      }

      history.push(Routes.vehicles.path);

      actions.setSubmitting(false);
    },
    render: ({ errors, touched, setFieldValue }) => {
      const models = modelsResult.data?.map((e) => ({
        label: `${e.brand.name} ${e.name}`,
        value: e.id,
      }));

      const fuels = fuelsResult.data?.map((e) => ({
        label: e.name,
        value: e.id,
      }));

      const previewImage = initialValues.image
        ? getImage(initialValues.image)
        : undefined;

      return (
        <>
          {initialValues.id && <FormInput label="ID" name="id" readOnly />}
          <FormImageFile
            label="Image"
            name="image"
            onFile={setFieldValue}
            defaultSrc={previewImage}
          />
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
          {isAdmin && <FormCheckbox label="Is Available" name="isAvailable" />}
          <FormInput
            label="Rent Price"
            name="rentPrice"
            type="number"
            min={1}
            error={errors.rentPrice}
            touched={touched.rentPrice}
          />
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
