export const viewGeneral = (obj: any, value: string | number) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  const index = values.indexOf(value);
  return keys[index];
};
