import { useState, useMemo } from "react";
import DataTable, {
  IDataTableProps,
  IDataTableStyles,
} from "react-data-table-component";
import { InputWithReset } from ".";

interface CustomDataTableProps<T> {
  onDetails: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
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

type Props<T = any> = CustomDataTableProps<T> & IDataTableProps<T>;

export function CustomDataTable<T = any>(props: Props<T>) {
  const { data, columns, ...rest } = props;

  const [filterText, setFilterText] = useState("");
  const subHeaderMemo = useMemo(() => {
    return <FilterComponent onChange={(e) => setFilterText(e)} />;
  }, [setFilterText]);

  const filteredItems = filterObjectsByText(data || [], filterText);

  return (
    <DataTable
      {...rest}
      columns={columns}
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
