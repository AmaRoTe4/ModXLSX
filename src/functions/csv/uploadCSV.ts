import Papa from "papaparse";
import * as XLSX from "xlsx";

// Función para parsear archivos (CSV o XLSX)
export const parseFile = (file: File): Promise<Array<any>> => {
  return new Promise((resolve, reject) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension === "csv") {
      Papa.parse(file, {
        header: true, // Usar la primera fila como encabezados
        skipEmptyLines: true, // Saltar líneas vacías
        complete: (result) => {
          resolve(result.data); // Resolver con los datos parseados
        },
        error: (err) => {
          reject(err); // Rechazar en caso de error
        },
      });
    } else if (fileExtension === "xlsx") {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });

          let res: any[] = [];

          for (let i = 0; i < workbook.SheetNames.length; i++) {
            const worksheet = workbook.Sheets[workbook.SheetNames[i]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            res = [...res, ...jsonData];
          }

          resolve(res);
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
