import { Container, fireForm, FormInput, MainButton } from "src/components";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { BrandDTO } from "@shared/types";
import { useQuery } from "react-query";
import { Services } from "src/services";
import Loader from "react-loader-spinner";
import * as Yup from "yup";

interface BrandValues extends Omit<BrandDTO, "id"> {}

const columns: IDataTableColumn<BrandDTO>[] = [
  {
    name: "ID",
    sortable: true,
    selector: (e) => e.id,
  },

  {
    name: "Name",
    sortable: true,
    selector: (e) => e.name,
  },

  {
    name: "Actions",
    cell: (row) => {
      return <button>Edit {row.id}</button>;
    },
  },
];

export function Brands() {
  const { isLoading, data } = useBrands();
  const initialValues: BrandValues = { name: "" };
  console.log(data);

  if (isLoading) {
    // TODO: Wrap in a single component
    return (
      <Container className="h-full">
        <div className="flex flex-row h-full items-center justify-center">
          <Loader type="Oval" color="red" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="h-full lg:max-w-5xl">
      <div className="p-1">
        <MainButton onClick={() => openBrandEditor(initialValues)}>
          Add Brand
        </MainButton>
      </div>
      <DataTable columns={columns} data={data!} striped />
    </Container>
  );
}

function openBrandEditor(initialValues: BrandValues) {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Brand name is required")
      .test(
        "empty",
        "Brand name cannot be blank",
        (name) => name?.trim().length !== 0
      ),
  });

  fireForm({
    title: "Add Brand",
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      console.log(values);

      try {
        const result = await Services.brands.create(values);
        console.log(result);
      } finally {
        actions.setSubmitting(false);
      }
    },
    render: ({ errors, touched }) => (
      <FormInput
        label="Name"
        name="name"
        error={errors.name}
        touched={touched.name}
      />
    ),
  });
}

function useBrands() {
  return useQuery("brands", {
    refetchOnMount: false,
    queryFn: () => Services.brands.getAll(),
  });
}
