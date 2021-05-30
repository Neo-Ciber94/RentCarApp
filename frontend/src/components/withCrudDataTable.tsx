import { IDataTableColumn, IDataTableProps } from "react-data-table-component";
import { MainButton } from ".";
import { CustomDataTable } from "./CustomDataTable";

interface Props<T> {
  addButtonText?: string;
  actionsText?: string;
  onAdd: () => void;
  onDetails: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

type CrudDataTableProps<T> = Props<T> & IDataTableProps<T>;

export function withCrudDataTable<T>(props: CrudDataTableProps<T>) {
  const {
    columns,
    data,
    onAdd,
    onDetails,
    onEdit,
    onDelete,
    addButtonText,
    actionsText,
  } = props;

  const mergedColumns: IDataTableColumn<T>[] = [
    ...columns,
    {
      name: actionsText || "Actions",
      cell: (row) => {
        return (
          <div className="flex flex-row w-full justify-center gap-4 lg:gap-10">
            <i
              className="fas fa-info-circle text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => onDetails(row)}
            ></i>
            <i
              className="fas fa-edit text-green-600 hover:text-green-800 cursor-pointer"
              onClick={() => onEdit(row)}
            ></i>
            <i
              className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"
              onClick={() => onDelete(row)}
            ></i>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="p-1">
        <MainButton className="text-lg" onClick={onAdd}>
          {addButtonText || "Add"}
        </MainButton>
      </div>
      <CustomDataTable columns={mergedColumns} data={data || []} />
    </>
  );
}
