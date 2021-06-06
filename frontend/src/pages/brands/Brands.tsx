import {
  Container,
  openSwalForm,
  FormInput,
  Loading,
  ReactSwal,
  withCrudDataTable,
} from "src/components";
import { IDataTableColumn } from "react-data-table-component";
import { BrandDTO } from "@shared/types";
import { useQuery } from "react-query";
import { Services } from "src/services";
import * as Yup from "yup";
import { TextWithLabel } from "src/components/TextWithLabel";
import { Colors } from "src/layout/Colors";
import Swal from "sweetalert2";

const brandService = Services.brands;

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
];

export function Brands() {
  const { isLoading, data = [], refetch } = useBrands();
  const initialValues: Omit<BrandDTO, "id"> = { name: "" };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="h-full lg:max-w-5xl">
      {withCrudDataTable({
        columns,
        data,
        addButtonText: "Add Brand",
        onAdd: () => openEditor(initialValues).then(() => refetch()),
        onDelete: (row) => openDelete(row).then(() => refetch),
        onDetails: (row) => openDetails(row, refetch),
        onEdit: (row) => openEditor(row).then(() => refetch()),
      })}
    </Container>
  );
}

async function openEditor(initialValues: Partial<BrandDTO>) {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Brand name is required")
      .test(
        "empty",
        "Brand name cannot be blank",
        (name) => name?.trim().length !== 0
      ),
  });

  return openSwalForm({
    title: "Add Brand",
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        let result: BrandDTO;
        if ("id" in values) {
          result = await brandService.update(values as BrandDTO);
        } else {
          result = await brandService.create(values);
        }
        console.log(result);
        actions.close();
      } finally {
        actions.setSubmitting(false);
      }
    },
    render: ({ errors, touched }) => (
      <>
        {initialValues.id && <FormInput label="ID" name="id" readOnly />}
        <FormInput
          label="Name"
          name="name"
          autoFocus
          error={errors.name}
          touched={touched.name}
        />
      </>
    ),
  });
}

async function openDelete(entity: BrandDTO) {
  return ReactSwal.fire({
    icon: "warning",
    title: "Delete Brand",
    showCancelButton: true,
    confirmButtonColor: Colors.Main,
    focusCancel: true,
    html: (
      <p>
        Do you want to delete brand <strong>{entity.name}</strong>?
      </p>
    ),
  }).then(async (result) => {
    if (result.isConfirmed) {
      const result = await brandService.delete(entity.id);
      console.log("DELETED", result);
    }
  });
}

async function openDetails(entity: BrandDTO, rerender: () => void) {
  return ReactSwal.fire({
    title: "Brand",
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

function useBrands() {
  return useQuery("brands", {
    queryFn: () => brandService.getAll(),
  });
}
