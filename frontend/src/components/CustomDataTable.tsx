import { useState, useMemo } from "react";
import DataTable, {
  IDataTableProps,
  IDataTableStyles,
} from "react-data-table-component";
import { InputWithReset } from ".";

export interface CustomDataTableProps<T> extends IDataTableProps<T> {
  ref?: this;
  sortable?: boolean;
}

// Redefinition due they don't work as expected
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
  noData: {
    style: {
      color: "rgb(248, 113, 113)",
      fontSize: "calc(14px + 1vw)",
      marginTop: 100,
      fontWeight: 300,
    },
  },
};

export function CustomDataTable<T = any>(props: CustomDataTableProps<T>) {
  const { data, columns, sortable, ...rest } = props;

  // Mark the columns as sortable
  if (sortable != null) {
    for (const column of columns) {
      if (column.sortable !== false) {
        column.sortable = sortable;
      }
    }
  }

  const [filterText, setFilterText] = useState("");
  const subHeaderMemo = useMemo(() => {
    return <FilterComponent onChange={(e) => setFilterText(e)} />;
  }, [setFilterText]);

  const filteredItems = filterObjectsByText(data || [], filterText);

  return (
    <DataTable
      columns={columns}
      data={filteredItems!}
      customStyles={customStyles}
      paginationComponentOptions={{ noRowsPerPage: true }}
      subHeaderComponent={subHeaderMemo}
      subHeader={data.length > 0}
      noHeader
      highlightOnHover
      pagination={true}
      dense
      striped
      {...rest}
    />
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
  return (
    <div className="w-full sm:w-auto">
      <InputWithReset placeholder="Search..." onChange={props.onChange} />
    </div>
  );
}
