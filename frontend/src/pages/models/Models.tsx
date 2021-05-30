import {
  Container,
  openSwalForm,
  FormInput,
  Loading,
  ReactSwal,
  withCrudDataTable,
} from "src/components";
import { IDataTableColumn } from "react-data-table-component";
import { BrandDTO, ModelDTO, VehicleType } from "@shared/types";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Services } from "src/services";
import * as Yup from "yup";
import { TextWithLabel } from "src/components/TextWithLabel";
import { Colors } from "src/layout/Colors";
import Swal from "sweetalert2";
import { FormikProps } from "formik";
import { title } from "process";
import { FormSelect } from "src/components/FormSelect";

const columns: IDataTableColumn<ModelDTO>[] = [
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
    name: "Brand",
    sortable: true,
    selector: (e) => e.brand.name,
  },

  {
    name: "Type",
    sortable: true,
    selector: (e) => e.vehicleType,
  },

  {
    name: "Capacity",
    sortable: true,
    selector: (e) => e.capacity,
  },
];

export function Models() {
  const { isLoading, data = [], refetch } = useModels();
  const initialValues: Omit<ModelDTO, "id" | "brand"> = {
    name: "",
    brandId: 1,
    capacity: 4,
    vehicleType: VehicleType.Car,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="h-full lg:max-w-5xl">
      {withCrudDataTable({
        columns,
        data,
        addButtonText: "Add Model",
        onAdd: () => openEditor(initialValues).then(() => refetch()),
        onDelete: (row) => openDelete(row).then(() => refetch),
        onDetails: (row) => openDetails(row, refetch),
        onEdit: (row) => openEditor(row).then(() => refetch()),
      })}
    </Container>
  );
}

const queryClient = new QueryClient();

async function openEditor(initialValues: Partial<ModelDTO>) {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Model name is required")
      .test(
        "empty",
        "Model name cannot be blank",
        (name) => name?.trim().length !== 0
      ),

    brandId: Yup.number().required("Brand is required"),
    vehicleType: Yup.string().required("Vehicle type is required"),
    capacity: Yup.number()
      .required("Vehicle capacity is required")
      .min(1, "Vehicle capacity must be 1 or more"),
  });

  return openSwalForm({
    title: "Add Model",
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        let result: ModelDTO;

        if ("id" in values) {
          result = await Services.models.update(values as ModelDTO);
        } else {
          result = await Services.models.create(values as ModelDTO);
        }
        console.log(result);
        actions.close();
      } finally {
        actions.setSubmitting(false);
      }
    },
    render: (props) => (
      <QueryClientProvider client={queryClient}>
        <ModelEditorForm formikProps={props} />
      </QueryClientProvider>
    ),
  });
}

async function openDelete(entity: ModelDTO) {
  return ReactSwal.fire({
    icon: "warning",
    title: "Delete Model",
    showCancelButton: true,
    confirmButtonColor: Colors.MainColor,
    focusCancel: true,
    html: (
      <p>
        Do you want to delete model{" "}
        <strong>
          {entity.brand.name} {entity.name}
        </strong>
        ?
      </p>
    ),
  }).then(async (result) => {
    if (result.isConfirmed) {
      const result = await Services.brands.delete(entity.id);
      console.log("DELETED", result);
    }
  });
}

async function openDetails(entity: ModelDTO, rerender: () => void) {
  return ReactSwal.fire({
    title: "Model",
    showCancelButton: true,
    confirmButtonColor: Colors.MainColor,
    cancelButtonText: "Ok",
    confirmButtonText: "Edit",
    focusCancel: true,
    html: (
      <div className="text-left">
        <TextWithLabel label="ID" value={entity.id} />
        <hr className="my-2" />
        <TextWithLabel label="Brand" value={entity.brand.name} />
        <hr className="my-2" />
        <TextWithLabel label="Name" value={entity.name} />
        <hr className="my-2" />
        <TextWithLabel label="Type" value={entity.vehicleType} />
        <hr className="my-2" />
        <TextWithLabel label="Capacity" value={entity.capacity} />
      </div>
    ),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.close();
      return openEditor(entity).then(rerender);
    }

    return null;
  });
}

function ModelEditorForm(props: {
  formikProps: FormikProps<Partial<ModelDTO>>;
}) {
  const { isLoading, data } = useBrands();
  const { errors, touched } = props.formikProps;

  if (isLoading) {
    return <Loading />;
  }

  const options = data?.map((e) => ({ label: e.name, value: e.id })) || [];

  return (
    <>
      <FormSelect
        name="brandId"
        label="Brand"
        options={options}
        error={errors.brandId}
        touched={touched.brandId}
        onChange={(e) => console.log(e.target.value)}
        // defaultLabel="Select a brand..."
      />

      <FormInput
        label="Model Name"
        name="name"
        error={errors.name}
        touched={touched.name}
      />

      <FormSelect
        name="vehicleType"
        label="Type"
        options={{
          Car: VehicleType.Car,
          Wagon: VehicleType.Wagon,
          Jeep: VehicleType.Jeep,
        }}
        error={errors.vehicleType}
        touched={touched.vehicleType}
      />

      <FormInput
        label="Capacity"
        name="capacity"
        type="number"
        min={1}
        error={errors.capacity}
        touched={touched.capacity}
      />
    </>
  );
}

function useModels() {
  return useQuery("models", {
    queryFn: () => Services.models.getAll(),
  });
}

function useBrands() {
  return useQuery("brands", {
    queryFn: () => Services.brands.getAll(),
  });
}
