export function downloadFile(fileName: string, data: string) {
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(data));
  link.setAttribute("download", fileName);
  link.click();
}

export function downloadCSV(fileName: string, data: string) {
  if (!data.match(/^data:text\/csv/i)) {
    data = `data:text/csv;charset=utf-8,${data}`;
  }

  downloadFile(fileName, data);
}
