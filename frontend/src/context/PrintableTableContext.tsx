import { createContext, useContext, useRef, useState } from "react";
import { IDataTableColumn } from "react-data-table-component";
import { useReactToPrint } from "react-to-print";
import { PrintableTable } from "src/components";

interface PrintableOptions<T = any> {
  documentTitle?: string;
  data: T[];
  columns: IDataTableColumn<T>[];
}

interface PrintableTableContextProps<T = any> {
  print: (content: PrintableOptions<T>) => void;
}

export const PrintableTableContext = createContext<PrintableTableContextProps>(
  {} as PrintableTableContextProps
);

export const PrintableTableProvider: React.FC = ({ children }) => {
  const componentRef: any = useRef(null);

  const print = useReactToPrint({
    content: () => componentRef.current,
  })!;

  const [printable, setPrintable] = useState<PrintableOptions>(
    {} as PrintableOptions
  );

  // prettier-ignore
  return (
    <PrintableTableContext.Provider value={{print: (data) => {
        setPrintable(data);
        print();
    }}}>
      <PrintableTable
        ref={componentRef}
        data={printable?.data || []}
        columns={printable?.columns || []}
      />
      {children}
    </PrintableTableContext.Provider>
  );
};

export function usePrintableTable() {
  return useContext(PrintableTableContext);
}
