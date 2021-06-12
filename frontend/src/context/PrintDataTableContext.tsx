import { createContext, useContext, useEffect, useRef, useState } from "react";
import { IDataTableColumn } from "react-data-table-component";
import { useReactToPrint } from "react-to-print";
import { PrintDataTable } from "src/components";

interface PrintableOptions<T = any> {
  documentTitle?: string;
  data: T[];
  columns: IDataTableColumn<T>[];
}

interface PrintDataTableContextProps<T = any> {
  isPrinting: boolean;
  print: (content: PrintableOptions<T>) => void;
}

export const PrintDataTableContext = createContext<PrintDataTableContextProps>(
  {} as PrintDataTableContextProps
);

export const PrintDataTableProvider: React.FC = ({ children }) => {
  const componentRef: any = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printable, setPrintable] = useState<PrintableOptions>();
  const print = useReactToPrint({ content: () => componentRef.current })!;

  // If `isPrinting` call print()
  useEffect(() => {
    if (isPrinting) {
      print();
      setIsPrinting(false);
      setPrintable({} as PrintableOptions);
    }
  }, [print, isPrinting, setIsPrinting]);

  // prettier-ignore
  return (
    <PrintDataTableContext.Provider value={{
      isPrinting,
      print: (data) => {
        setPrintable(data);
        setIsPrinting(true);
    }}}>
      <PrintDataTable
        ref={componentRef}
        data={printable?.data || []}
        columns={printable?.columns || []}
      />
      {children}
    </PrintDataTableContext.Provider>
  );
};

export function usePrintableTable() {
  return useContext(PrintDataTableContext);
}
