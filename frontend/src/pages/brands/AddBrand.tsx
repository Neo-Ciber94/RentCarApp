import { BrandDTO } from "@shared/types";
import { FormInput, withCustomForm } from "src/components";
// import { Services } from "src/services";
// import { goToBrands } from "src/utils/historyHelper";

interface BrandValues extends Omit<BrandDTO, "id"> {}

export const AddBrand: React.FC = () => {
  const initialValues: BrandValues = { name: "" };
  // const history = useHistory();

  return withCustomForm({
    initialValues,
    onCancel: () => {
      console.log("Cancel");
    },
    onSubmit: (values) => {
      console.log(values);
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
