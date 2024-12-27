export function cleanObjectKeys({
  obj,
  validKeys,
}: {
  obj: Record<string, any>;
  validKeys: string[];
}): Record<string, any> {
  const trimmedObject: Record<string, any> = {};
  const valida_te_use = validKeys.map((n) => n.trim().toLowerCase());

  Object.keys(obj).forEach((key) => {
    const trimmedKey = key.trim().toLowerCase();
    if (valida_te_use.includes(trimmedKey)) {
      trimmedObject[trimmedKey] = obj[key];
    }
  });

  return trimmedObject;
}
