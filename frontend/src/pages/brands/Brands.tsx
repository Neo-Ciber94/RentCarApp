import { Container, fireForm, FormInput, MainButton } from "src/components";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { BrandDTO } from "@shared/types";
import { useQuery } from "react-query";
import { Services } from "src/services";
import Loader from "react-loader-spinner";

import * as Yup from "yup";
import { CSSProperties } from "react";

interface BrandValues extends Omit<BrandDTO, "id"> {}

// Redefinition due they don't work as expected
export interface IDataTableStyles {
  table?: {
    style: CSSProperties;
  };
  tableWrapper?: {
    style: CSSProperties;
  };
  header?: {
    style: CSSProperties;
  };
  subHeader?: {
    style: CSSProperties;
  };
  head?: {
    style: CSSProperties;
  };
  headRow?: {
    style?: CSSProperties;
    denseStyle?: CSSProperties;
  };
  headCells?: {
    style?: CSSProperties;
    activeSortStyle?: CSSProperties;
    inactiveSortStyle?: CSSProperties;
  };
  contextMenu?: {
    style?: CSSProperties;
    activeStyle?: CSSProperties;
  };
  cells?: {
    style: CSSProperties;
  };
  rows?: {
    style?: CSSProperties;
    selectedHighlightStyle?: CSSProperties;
    denseStyle?: CSSProperties;
    highlightOnHoverStyle?: CSSProperties;
    stripedStyle?: CSSProperties;
  };
  expanderRow?: {
    style: CSSProperties;
  };
  expanderCell?: {
    style: CSSProperties;
  };
  expanderButton?: {
    style: CSSProperties;
  };
  pagination?: {
    style?: CSSProperties;
    pageButtonsStyle?: CSSProperties;
  };
  noData?: {
    style: CSSProperties;
  };
  progress?: {
    style: CSSProperties;
  };
}

const customStyles: IDataTableStyles = {
  headRow: {
    style: {
      backgroundColor: "rgb(220, 38, 38)",
      borderRadius: "5px",
    },
  },
  headCells: {
    style: {
      color: "white",
      fontSize: "18px",
      textAlign: "center",
      padding: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  cells: {
    style: {
      fontSize: "18px",
      padding: "5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
};

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
      return (
        <div className="flex flex-row w-full justify-center gap-4 lg:gap-10">
          <i
            className="fas fa-info-circle text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => console.log("Info")}
          ></i>
          <i
            className="fas fa-edit text-green-600 hover:text-green-800 cursor-pointer"
            onClick={() => console.log("Edit")}
          ></i>
          <i
            className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"
            onClick={() => console.log("Delete")}
          ></i>
        </div>
      );
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
      <DataTable
        columns={columns}
        data={data!}
        customStyles={customStyles}
        paginationComponentOptions={{ noRowsPerPage: true }}
        paginationTotalRows={10}
        highlightOnHover
        pagination
        dense
        striped
      />
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
