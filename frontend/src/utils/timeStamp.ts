export function timeStamp() {
  return Math.floor(Date.now() / 1000);
}

export function dateTimeStamp() {
  return `${new Date().toDateString()}-${timeStamp()}`;
}
