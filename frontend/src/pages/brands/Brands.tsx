import {
  Container,
  openSwalForm,
  FormInput,
  Loading,
  MainButton,
  ReactSwal,
} from "src/components";
import { IDataTableColumn } from "react-data-table-component";
import { BrandDTO } from "@shared/types";
import { useQuery } from "react-query";
import { Services } from "src/services";
import * as Yup from "yup";
import { TextWithLabel } from "src/components/TextWithLabel";
import { Colors } from "src/layout/Colors";
import Swal from "sweetalert2";
import { CustomDataTable } from "src/components/CustomDataTable";

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
  const { isLoading, data, refetch } = useBrands();
  const initialValues: Omit<BrandDTO, "id"> = { name: "" };

  if (isLoading) {
    return <Loading />;
  }

  const mergedColumns: IDataTableColumn<BrandDTO>[] = [
    ...columns,
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex flex-row w-full justify-center gap-4 lg:gap-10">
            <i
              className="fas fa-info-circle text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => openBrandDetails(row, refetch)}
            ></i>
            <i
              className="fas fa-edit text-green-600 hover:text-green-800 cursor-pointer"
              onClick={() => openBrandEditor(row).then(() => refetch())}
            ></i>
            <i
              className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"
              onClick={() => openBrandDelete(row).then(() => refetch())}
            ></i>
          </div>
        );
      },
    },
  ];

  return (
    <Container className="h-full lg:max-w-5xl">
      <div className="p-1">
        <MainButton
          className="text-lg"
          onClick={() => openBrandEditor(initialValues).then(() => refetch())}
        >
          Add Brand
        </MainButton>
      </div>
      <CustomDataTable columns={mergedColumns} data={data || []} />
    </Container>
  );
}

async function openBrandEditor(initialValues: BrandDTO | Omit<BrandDTO, "id">) {
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
          result = await Services.brands.update(values as BrandDTO);
        } else {
          result = await Services.brands.create(values);
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

async function openBrandDelete(brand: BrandDTO) {
  return ReactSwal.fire({
    icon: "warning",
    title: "Delete Brand",
    text: `Do you want to delete brand '${brand.name}'?`,
    showCancelButton: true,
    confirmButtonColor: Colors.MainColor,
    focusCancel: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const result = await Services.brands.delete(brand.id);
      console.log("DELETED", result);
    }
  });
}

async function openBrandDetails(brand: BrandDTO, rerender: () => void) {
  return ReactSwal.fire({
    title: "Brand",
    showCancelButton: true,
    confirmButtonColor: Colors.MainColor,
    cancelButtonText: "Ok",
    confirmButtonText: "Edit",
    focusCancel: true,
    html: (
      <div className="text-left">
        <TextWithLabel label="ID" value={brand.id} />
        <hr className="my-2" />
        <TextWithLabel label="Name" value={brand.name} />
      </div>
    ),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.close();
      return openBrandEditor(brand).then(rerender);
    }

    return null;
  });
}

function useBrands() {
  return useQuery("brands", {
    refetchOnMount: false,
    queryFn: () => Services.brands.getAll(),
  });
}
