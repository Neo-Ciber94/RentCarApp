/**
 * Represents a csv column.
 */
export interface CsvColumn<T> {
  /**
   * Name of the obj key.
   */
  name: keyof T;

  /**
   * Select the data to include in the cell.
   */
  selector?: (value: T, index: number) => string;
}

/**
 * Configuration for create csv files.
 */
export interface CSVConfig<T> {
  /**
   * Data to convert to csv.
   */
  data: T[];

  /**
   * Header of the csv.
   */
  header?: string[];

  /**
   * Columns of the csv, if provided the `header` will be ignored.
   */
  columns?: CsvColumn<T>[];

  /**
   * Separator of the cell, by default comma: `,`
   */
  separator?: string;

  /**
   * Escape of the separator, by default quote: `"`
   */
  escape?: string;
}

/**
 * Converts the given array to a csv string.
 * @param config Configuration for convert the data to csv.
 * @returns A csv string.
 */
export function convertToCSV<T>(config: CSVConfig<T>): string {
  const { separator = ",", escape = '"' } = config;
  const data = config.data;
  let header: string[] = getHeader(config);
  let result = "";

  result += joinCSV(header, separator, escape);

  for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    const row = getRow(obj, i, config);
    result += joinCSV(row, separator, escape);
  }

  return result;
}

function getHeader<T>(config: CSVConfig<T>): string[] {
  if (config.columns) {
    return config.columns.map((e) => e.name.toString());
  }

  let header: string[];

  if (config.header) {
    header = config.header;
  } else {
    if (config.data.length === 0) {
      throw new Error("Header must be specified if data is empty");
    }

    header = Object.keys(config.data[0]);
  }

  return header;
}

function getRow<T>(obj: T, index: number, config: CSVConfig<T>): string[] {
  if (config.columns) {
    const rows: string[] = [];

    for (const column of config.columns) {
      const columnName = column.name;
      if (columnName in obj) {
        let value: string;

        if (column.selector) {
          value = column.selector(obj, index);
        } else {
          value = (obj as any)[columnName];
        }
        rows.push(value);
      } else {
        throw new TypeError(
          `'${JSON.stringify(
            obj
          )}' does not contain a property named ${columnName}`
        );
      }
    }

    return rows;
  } else {
    return Object.values(obj).map((e) => (e == null ? "" : e + ""));
  }
}

function joinCSV(data: string[], separator: string, escape: string) {
  let result = "";

  for (let i = 0; i < data.length; i++) {
    let row = data[i];

    if (row.includes(separator)) {
      row = `${escape}${row}${escape}`;
    }

    if (i < data.length - 1) {
      row += separator;
    }

    result += row;
  }

  return result + "\n";
}
