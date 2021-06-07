import {
  Container,
  openSwalForm,
  FormInput,
  Loading,
  ReactSwal,
  withCrudDataTable,
} from "src/components";
import { IDataTableColumn } from "react-data-table-component";
import { useQuery } from "react-query";
import { Services } from "src/services";
import * as Yup from "yup";
import { TextWithLabel } from "src/components/TextWithLabel";
import { Colors } from "src/layout/Colors";
import Swal from "sweetalert2";
import { FuelDTO } from "@shared/types";

const fuelService = Services.fuels;

const columns: IDataTableColumn<FuelDTO>[] = [
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
];

export function Fuels() {
  const { isLoading, data = [], refetch } = useFuels();
  const initialValues: Omit<FuelDTO, "id"> = { name: "" };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="h-full lg:max-w-6xl">
      {withCrudDataTable({
        columns,
        data,
        addButtonText: "Add Fuel",
        onAdd: () => openEditor(initialValues).then(() => refetch()),
        onDelete: (row) => openDelete(row).then(() => refetch()),
        onDetails: (row) => openDetails(row, refetch),
        onEdit: (row) => openEditor(row).then(() => refetch()),
      })}
    </Container>
  );
}

async function openEditor(initialValues: FuelDTO | Omit<FuelDTO, "id">) {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Fuel name is required")
      .test(
        "empty",
        "Fuel name cannot be blank",
        (name) => name?.trim().length !== 0
      ),
  });

  return openSwalForm({
    title: "Add Fuel",
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        let result: FuelDTO;
        if ("id" in values) {
          result = await fuelService.update(values as FuelDTO);
        } else {
          result = await fuelService.create(values);
        }
        console.log(result);
        actions.close();
      } finally {
        actions.setSubmitting(false);
      }
    },
    render: ({ errors, touched }) => (
      <FormInput
        label="Name"
        name="name"
        autoFocus
        error={errors.name}
        touched={touched.name}
      />
    ),
  });
}

async function openDelete(entity: FuelDTO) {
  return ReactSwal.fire({
    icon: "warning",
    title: "Delete Fuel",
    showCancelButton: true,
    confirmButtonColor: Colors.Main,
    focusCancel: true,
    html: (
      <p>
        Do you want to delete Fuel <strong>{entity.name}</strong>?
      </p>
    ),
  }).then(async (result) => {
    if (result.isConfirmed) {
      const result = await fuelService.delete(entity.id);
      console.log("DELETED", result);
    }
  });
}

async function openDetails(entity: FuelDTO, rerender: () => void) {
  return ReactSwal.fire({
    title: "Fuel",
    showCancelButton: true,
    confirmButtonColor: Colors.Main,
    cancelButtonText: "Ok",
    confirmButtonText: "Edit",
    focusCancel: true,
    html: (
      <div className="text-left">
        <TextWithLabel label="ID" value={entity.id} />
        <hr className="my-2" />
        <TextWithLabel label="Name" value={entity.name} />
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

function useFuels() {
  return useQuery("fuels", {
    queryFn: () => fuelService.getAll(),
  });
}
