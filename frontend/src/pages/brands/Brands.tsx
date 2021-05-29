import { Container, LinkButton, MainButton } from "src/components";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { BrandDTO } from "@shared/types";
import { useQuery } from "react-query";
import { Services } from "src/services";
import Loader from "react-loader-spinner";
import { useNewHeaderTitle } from "src/context/HeaderTitleContext";

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
      return <button>Edit {row}</button>;
    },
  },
];

export function Brands() {
  const { isLoading, data } = useBrands();
  useNewHeaderTitle("Brands");

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

  console.log(data);

  return (
    <Container className="h-full lg:max-w-5xl">
      <div>
        <LinkButton to="/brands/new">Add Brand</LinkButton>
      </div>
      <DataTable columns={columns} data={data!} />
    </Container>
  );
}

function useBrands() {
  return useQuery("brands", () => {
    return Services.brands.getAll();
  });
}
