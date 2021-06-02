export {};

declare global {
  // prettier-ignore
  // https://stackoverflow.com/a/54178819/9307869
  export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
}
