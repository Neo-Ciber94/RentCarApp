import { IDataTableColumn } from "react-data-table-component";
import { NavLink } from "react-router-dom";
import { LinkButton, MainButton } from ".";
import { CustomDataTable, CustomDataTableProps } from "./CustomDataTable";

interface DataTableActionButton<T> {
  text: string;
  classNames?: string;
  onClick: (data: T[]) => void;
}

interface Props<T> {
  addButtonText?: string;
  actionsText?: string;
  actionButtons?: DataTableActionButton<T>[];
  onAdd?: () => void;
  onDetails?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  addPath?: string;
  detailsPath?: (item: T) => string;
  editPath?: (item: T) => string;
  deletePath?: (item: T) => string;
  canAdd?: boolean;
  canEdit?: boolean | ((row: T) => boolean);
  canView?: boolean | ((row: T) => boolean);
  canDelete?: boolean | ((row: T) => boolean);
}

type CrudDataTableProps<T = any> = Props<T> & CustomDataTableProps<T>;

export function withCrudDataTable<T>(props: CrudDataTableProps<T>) {
  const {
    columns,
    data,
    actionsText,
    actionButtons = [],
    onAdd,
    addPath,
    onDetails,
    detailsPath,
    onEdit,
    editPath,
    onDelete,
    deletePath,
    canAdd = true,
    canView = true,
    canEdit = true,
    canDelete = true,
    ...rest
  } = props;

  if (canAdd && onAdd == null && addPath == null) {
    throw new Error("`withCrudDataTable` requires 1: 'onAdd' or 'addPath'");
  }

  if (canView && onDetails == null && detailsPath == null) {
    throw new Error(
      "`withCrudDataTable` requires 1: 'onDetails' or 'detailsPath'"
    );
  }

  if (canEdit && onEdit == null && editPath == null) {
    throw new Error("`withCrudDataTable` requires 1: 'onEdit' or 'editPath'");
  }

  if (canDelete && onDelete == null && deletePath == null) {
    throw new Error(
      "`withCrudDataTable` requires 1: 'onDelete' or 'deletePath'"
    );
  }

  // prettier-ignore
  const mergedColumns: IDataTableColumn<T>[] = [
    ...columns,
    {
      name: actionsText || "Actions",
      cell: (row) => {
        const viewBtn = typeof canView === "boolean" ? canView : canView(row);
        const editBtn = typeof canEdit === "boolean" ? canEdit : canEdit(row);
        const deleteBtn = typeof canDelete === "boolean" ? canDelete : canDelete(row);

        return (
          <div className="flex flex-row w-full justify-center items-center gap-4 lg:gap-10">
            {viewBtn && <DetailsButton props={props} row={row} />}
            {editBtn && <EditButton props={props} row={row} />}
            {deleteBtn && <DeleteButton props={props} row={row} />}
          </div>
        );
      },
    },
  ];

  const actions = actionButtons.map((btn, index) => (
    <MainButton
      key={`${btn.text}-${index}`}
      onClick={() => btn.onClick(data)}
      className={`text-lg m-1 overflow-visible ${btn.classNames || ""}`}
    >
      {btn.text}
    </MainButton>
  ));

  return (
    <>
      <div className="flex flex-row gap-2">
        {canAdd && <AddButtom props={props} />} {actions}
      </div>

      <CustomDataTable
        pagination={true}
        columns={mergedColumns}
        data={data}
        {...rest}
      />
    </>
  );
}

const AddButtom = (props: { props: CrudDataTableProps<any> }) => {
  const { addPath, onAdd, addButtonText } = props.props;

  return addPath ? (
    <LinkButton to={addPath} className="text-lg m-1 overflow-visible">
      {addButtonText || "Add"}
    </LinkButton>
  ) : (
    <MainButton className="text-lg m-1 overflow-visible" onClick={onAdd}>
      {addButtonText || "Add"}
    </MainButton>
  );
};

// prettier-ignore
const DetailsButton = (props: {props: CrudDataTableProps<any>, row: any} ) => {
  const { detailsPath, onDetails } = props.props;

  if (detailsPath) {
    return (
      <NavLink to={detailsPath(props.row)}>
        <i className="fas fa-info-circle text-gray-500 hover:text-gray-700 cursor-pointer"></i>
      </NavLink>
    );
  } else {
    return (
      <i
        className="fas fa-info-circle text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={() => onDetails!(props.row)}
      ></i>
    );
  }
}

// prettier-ignore
const EditButton = (props: {props: CrudDataTableProps<any>, row: any} ) => {
  const { editPath, onEdit } = props.props;

  if (editPath) {
    return (
      <NavLink to={editPath(props.row)}>
        <i className="fas fa-edit text-green-600 hover:text-green-800 cursor-pointer"></i>
      </NavLink>
    );
  } else {
    return (
      <i
        className="fas fa-edit text-green-600 hover:text-green-800 cursor-pointer"
        onClick={() => onEdit!(props.row)}
      ></i>
    );
  }
}

// prettier-ignore
const DeleteButton = (props: {props: CrudDataTableProps<any>, row: any} ) => {
  const { deletePath, onDelete } = props.props;
  
  if (deletePath) {
    return (
      <NavLink to={deletePath(props.row)}>
        <i className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"></i>
      </NavLink>
    );
  } else {
    return (
      <i
        className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"
        onClick={() => onDelete!(props.row)}
      ></i>
    );
  }
}
