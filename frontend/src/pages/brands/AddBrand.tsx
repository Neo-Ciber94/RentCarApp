import { BrandDTO } from "@shared/types";
import { useHistory } from "react-router-dom";
import { FormInput, withCustomForm } from "src/components";
import { Routes } from "src/layout";
import { Services } from "src/services";
import * as Yup from "yup";

interface BrandValues extends Omit<BrandDTO, "id"> {}

export const AddBrand: React.FC = () => {
  const initialValues: BrandValues = { name: "" };
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Brand name is required")
      .test(
        "empty",
        "Brand name cannot be blank",
        (name) => name?.trim().length !== 0
      ),
  });

  const history = useHistory();

  return withCustomForm({
    initialValues,
    validationSchema: schema,
    onCancel: () => {
      history.push(Routes.brands.path);
    },
    onSubmit: async (values, actions) => {
      console.log(values);

      try {
        const result = await Services.brands.create(values);
        console.log(result);
        history.push(Routes.brands.path);
      } finally {
        actions.setSubmitting(false);
      }
    },
    render: ({ touched, errors }) => {
      return (
        <FormInput
          label="Name"
          name="name"
          touched={touched.name}
          error={errors.name}
        />
      );
    },
  });
};
