import Papa from "papaparse";
import * as XLSX from "xlsx";
import { validateObjectKeys } from "../controls/validateObjectKeys";
import { cleanObjectKeys } from "../controls/cleanObjectKeys";

export const parseFile = (
  file: File,
  useSheets?: string[],
  useColumns?: string[]
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          resolve(result.data);
        },
        error: (err) => {
          reject(err);
        },
      });
    } else if (fileExtension === "xlsx") {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });

          if (useColumns?.length === 0)
            useColumns = Object.keys(
              workbook.Sheets[Object.keys(workbook.Sheets)[0]]
            );

          const { individual, res } = extraerInfo(workbook, useSheets);
          const { valores, valores_for_sheet } = resultadoNormalize(
            res,
            individual,
            useColumns
          );

          resolve({ valores, valores_for_sheet });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    } else {
      reject(
        new Error("Unsupported file format. Please upload a CSV or XLSX file.")
      );
    }
  });
};

const extraerInfo = (workbook: any, useSheets?: string[]) => {
  let res: any[] = [];
  let individual: any = {};

  for (let i = 0; i < workbook.SheetNames.length; i++) {
    const name = workbook.SheetNames[i];

    if (useSheets && useSheets.length > 0) {
      const is = useSheets?.find(
        (n) => n.trim().toLowerCase() === name.trim().toLowerCase()
      );
      if (!is) {
        break;
      }
    }

    const worksheet = workbook.Sheets[name];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    individual = {
      ...individual,
      [name]: jsonData,
    };
    res = [...res, ...jsonData];
  }

  return {
    res,
    individual,
  };
};

const resultadoNormalize = (
  res: any,
  individual: any,
  useColumns?: string[]
) => {
  let valores_for_sheet = {};
  let individual_use: any = {};

  Object.keys({ ...individual }).forEach((n) => {
    const n_use = n.trim().toLowerCase();
    individual_use[n_use] = individual[n];
  });

  Object.keys(individual_use).forEach((key) => {
    //@ts-ignore
    const valores = individual_use?.[key];
    if (!valores || valores.length === 0) return;

    //@ts-ignore
    valores_for_sheet[key] = normalizeDataFile(
      valores,
      valores.length > 0,
      useColumns ?? []
    );
  });

  const valores = normalizeDataFile(res, res.length > 0, useColumns ?? []);

  return {
    valores,
    valores_for_sheet,
  };
};

const normalizeDataFile = (val: any[], use_use: boolean, cols: string[]) => {
  const columns_use = use_use
    ? Object.keys(
        val.sort((a, b) => Object.keys(b)?.length - Object.keys(a)?.length)?.[0]
      )
    : [];
  const col_length = columns_use.length;

  return val
    ?.filter((n, i) => {
      const key_incorpore = validateObjectKeys({
        obj: n,
        validKeys: cols,
      });

      if (!key_incorpore) return false;

      const len = Object.keys(n).length;
      const leng_status = len === col_length;
      const leng_status_uno = len === col_length - 1;
      const leng_status_dos = len === col_length - 2;

      return leng_status || leng_status_uno || leng_status_dos;
    })
    .map((n) => {
      return cleanObjectKeys({
        validKeys: cols,
        obj: n,
      });
    });
};
