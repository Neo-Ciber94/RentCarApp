export interface CSVConfig<T> {
  header?: string[];
  data: T[];
  separator?: string;
  escape?: string;
}

export function convertToCSV<T>(config: CSVConfig<T>): string {
  const { separator = ",", escape = '"' } = config;
  let header: string[];
  let result = "";

  if (config.header) {
    header = config.header;
  } else {
    if (config.data.length === 0) {
      throw new Error("Header must be specified if data is empty");
    }

    header = Object.keys(config.data[0]);
  }

  result += joinCSV(header, separator, escape);

  for (const obj of config.data) {
    const values = Object.values(obj).map((e) => (e == null ? "" : e + ""));
    result += joinCSV(values, separator, escape);
  }

  return result;
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
