export module Download {
  export function file(fileName: string, data: string) {
    const link = document.createElement("a");
    link.href = encodeURI(data);
    link.download = fileName;
    link.click();
  }

  export function csv(fileName: string, data: string) {
    if (!data.match(/^data:text\/csv/i)) {
      data = `data:text/csv;charset=utf-8,${data}`;
    }

    Download.file(fileName, data);
  }
}
