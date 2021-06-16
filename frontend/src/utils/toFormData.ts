export function toFormData<T extends any>(obj: T): FormData {
  const formData = new FormData();

  for (const key in obj) {
    const value = obj[key];

    // We ignore null values
    if (value) {
      formData.append(key, value + "");
    }
  }

  return formData;
}
