import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

// Función para descargar archivos (CSV o XLSX)
export const downloadFile = async (
  data: Array<any>,
  fileName: string = "data",
  format: "csv" | "xlsx" = "csv"
) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación de carga

    if (format === "csv") {
      const headers = Object.keys(data[0]);

      const csvData = [
        headers.join(","),
        ...data.map((row) =>
          headers
            .map((fieldName) => JSON.stringify(row[fieldName], replacer))
            .join(",")
        ),
      ].join("\r\n");

      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `${fileName}.csv`);
    } else if (format === "xlsx") {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const xlsxData = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([xlsxData], { type: "application/octet-stream" });
      saveAs(blob, `${fileName}.xlsx`);
    }

    return { status: true };
  } catch (error: any) {
    console.error(error);
    return { status: false, error };
  }
};

const replacer = (_key: string, value: any) => {
  return value === null ? "" : value;
};
