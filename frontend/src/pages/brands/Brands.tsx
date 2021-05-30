import {
  Container,
  openSwalForm,
  FormInput,
  Loading,
  MainButton,
  ReactSwal,
  InputWithReset,
} from "src/components";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { BrandDTO } from "@shared/types";
import { useQuery } from "react-query";
import { Services } from "src/services";
import * as Yup from "yup";
import { CSSProperties, useMemo, useState } from "react";

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
  subHeader: {
    style: {
      padding: "10px 0 10px 0 !important",
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
];

export function Brands() {
  const [filterText, setFilterText] = useState("");
  const subHeaderMemo = useMemo(() => {
    return <FilterComponent onChange={(e) => setFilterText(e)} />;
  }, [filterText, setFilterText]);

  const { isLoading, data, refetch } = useBrands();
  const initialValues: Omit<BrandDTO, "id"> = { name: "" };
  const filteredItems = filterObjectsByText(data || [], filterText);

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
              onClick={() => console.log("Info")}
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
          onClick={() => openBrandEditor(initialValues).then(() => refetch())}
        >
          Add Brand
        </MainButton>
      </div>
      <DataTable
        columns={mergedColumns}
        data={filteredItems!}
        customStyles={customStyles}
        paginationComponentOptions={{ noRowsPerPage: true }}
        paginationTotalRows={10}
        subHeaderComponent={subHeaderMemo}
        noHeader
        subHeader
        highlightOnHover
        pagination
        dense
        striped
      />
    </Container>
  );
}

function filterObjectsByText<T>(items: T[], text: string) {
  const result: T[] = [];

  // Iterate over each item of the list
  for (const item of items) {
    // Check if any property of the item contains the `text`
    for (const key in item) {
      const value = item[key] as { toString(): string };

      /* prettier-ignore */
      // We ignore case in the comparison
      if (value && value.toString().toLowerCase().includes(text.toLowerCase())) {
        result.push(item);
        break;
      }
    }
  }

  return result;
}

function FilterComponent(props: { onChange: (s: string) => void }) {
  return <InputWithReset placeholder="Search..." onChange={props.onChange} />;
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
    icon: "question",
    title: "Delete Brand",
    text: `Want do delete brand '${brand.name}'?`,
    showCancelButton: true,
    focusCancel: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const result = await Services.brands.delete(brand.id);
      console.log("DELETED", result);
    }
  });
}

function useBrands() {
  return useQuery("brands", {
    refetchOnMount: false,
    queryFn: () => Services.brands.getAll(),
  });
}
