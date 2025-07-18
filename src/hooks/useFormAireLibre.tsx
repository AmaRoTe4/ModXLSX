import { useEffect, useState } from "react";
import useXLSX from "./use/useXLSX";
import { downloadFile } from "../functions/csv/dowloadCSV";

const base_col = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default function useFormAireLibre() {
  const {
    file,
    handleFileUpload,
    loading,
    onReset,
    onDownloadFile,
    valoresUpload,
    valoresUploadForSheet,
  } = useXLSX({
    useColumns: base_col,
    normalize: false,
  });
  const [getUse, setUse] = useState(false);
  const [getData, setData] = useState<any[]>([]);
  const [loadingDowload, setLoadingDowload] = useState<boolean>(false);

  useEffect(() => {
    if (valoresUpload?.length > 0) {
      setUse(true);
    } else if (!valoresUpload || valoresUpload?.length === 0) {
      setUse(false);
    }

    const valores = normalizeInfo(valoresUpload);
    setData(valores);
  }, [valoresUpload]);

  function procesarString(input: string): { marca: string; precio: number } {
    const pattern = /marca: (.*?) precio: \$ ([\d.,]+)/;
    const match = input.match(pattern);

    if (match) {
      const marca = match[1].trim();
      const precioRaw = Number(match[2]);

      return {
        marca,
        precio: precioRaw,
      };
    } else {
      return {
        marca: "marca",
        precio: 0,
      };
    }
  }

  const normalizeInfo = (data: any[]) => {
    let latest_1: any = undefined;
    let data_use: any[] = [];

    const filter_data_1 = data.filter((n) => {
      let new_latest_1 = n["1"];

      if (
        (typeof new_latest_1 === "number" && latest_1 === undefined) ||
        (typeof new_latest_1 === "undefined" && typeof latest_1 === "number")
      ) {
        latest_1 = new_latest_1;
        return true;
      }
      return false;
    });

    let actual_1: any = undefined;

    filter_data_1.map((n, i) => {
      if (actual_1 === undefined) {
        const codigo = n?.["2"];
        const nombre = n?.["3"];

        if (typeof codigo === "undefined" || typeof nombre === "undefined")
          return;

        const base = {
          codigo: typeof codigo === "string" ? codigo?.trim() : codigo,
          nombre: typeof nombre === "string" ? nombre?.trim() : nombre,
        };

        actual_1 = base;
        return;
      } else {
        //@ts-ignore
        let string: string = Object.values(n).reduce((add: any, index: any) => {
          const more = index?.toString()?.trim()?.toLowerCase();

          return add + (add?.length > 0 ? " " : "") + more;
        }, "");

        const { marca, precio } = procesarString(string ?? "");

        const valor_add = {
          marca,
          precio,
          ...actual_1,
          nombre: actual_1.nombre + ` (${marca})`,
        };

        if (!Boolean(valor_add.precio)) return;

        data_use.push(valor_add);

        actual_1 = undefined;
        return;
      }
    });

    return data_use.filter((n) => {
      return Object.keys(n).length === 4;
    });
  };

  const dowloadInfo = async () => {
    console.log(getData);
    if (getData.length === 0) return alert("NO TIENE INFO");

    setLoadingDowload(true);
    await downloadFile(getData, "info", "xlsx");
    setLoadingDowload(false);
  };

  return {
    loading,
    handleFileUpload,
    valoresUpload,
    onReset,
    valoresUploadForSheet,
    file,
    onDownloadFile,
    getUse,
    getData,
    dowloadInfo,
    loadingDowload,
  };
}
