export function validateObjectKeys({
  obj,
  validKeys,
}: {
  obj: Record<string, any>;
  validKeys: string[];
}): boolean {
  if (validKeys.length === 0) return true;
  const valid = validKeys.map((n) => n.trim().toLowerCase());
  const objectKeys = Object.keys(obj).map((key) => key.trim().toLowerCase());
  const resultado = objectKeys.every((key) => valid.includes(key));
  return resultado;
}
