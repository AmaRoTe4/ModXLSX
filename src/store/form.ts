import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Props {
  getSheetRespete: any[];
  setSheetRespete: (valor: any[]) => void;
  getColumns: any[];
  setColumns: (valor: any[]) => void;
  getData: any[];
  setData: (valor: any[]) => void;
  getDataForSheet: any;
  setDataForSheet: (valor: any) => void;

  getDataRender: any[];
  setDataRender: (valor: any[]) => void;
  getNewColumns: any[];
  setNewColumns: (valor: any[]) => void;
  getValoresColumn: string[];
  setValoresColumn: (valor: string[]) => void;

  getLoadingDonwload: boolean;
  setLoadingDonwload: (valor: boolean) => void;
  getUseColumnView: boolean;
  setUseColumnView: (valor: boolean) => void;
  getModalDonwloadView: boolean;
  setModalDonwloadView: (valor: boolean) => void;
  getUse: boolean;
  setUse: (valor: boolean) => void;

  getValoresDonwload: { type: string; valor: string; name: string }[];
  setValoresDonwload: (valor: { type: string; valor: string }[]) => void;
}

//id
//nombre
//codigo	 		(default "")
//descripcion		(default "")
//precio_de_compra
//precio_de_venta_1
//cantidad		(default 0)
//tipo_de_cantidad	(default 0)
//id_proveedor		(default "")

const base_valores_donwload = [
  {
    name: "id",
    type: "0",
    valor: "",
  },
  {
    name: "nombre",
    type: "0",
    valor: "",
  },
  {
    name: "codigo",
    type: "1",
    valor: "",
  },

  {
    name: "descripcion",
    type: "1",
    valor: "",
  },
  {
    name: "precio_de_compra",
    type: "0",
    valor: "",
  },
  {
    name: "precio_de_venta_1",
    type: "0",
    valor: "",
  },

  {
    name: "cantidad",
    type: "1",
    valor: "0",
  },
  {
    name: "tipo_de_cantidad",
    type: "1",
    valor: "0",
  },
  {
    name: "id_proveedor",
    type: "1",
    valor: "",
  },
];

export type TypesValoresDonwload = 0 | 1 | 2;

export const useFormStore = create<Props>()(
  persist(
    (set) => ({
      getValoresDonwload: base_valores_donwload,
      setValoresDonwload: (aux: any[]) =>
        set(() => ({ getValoresDonwload: aux })),

      getSheetRespete: [],
      setSheetRespete: (aux: any[]) => set(() => ({ getSheetRespete: aux })),
      getColumns: [],
      setColumns: (aux: any[]) => set(() => ({ getColumns: aux })),
      getData: [],
      setData: (aux: any[]) => set(() => ({ getData: aux })),
      getDataForSheet: {},
      setDataForSheet: (aux: any) => set(() => ({ getDataForSheet: aux })),

      getDataRender: [],
      setDataRender: (aux: any[]) => set(() => ({ getDataRender: aux })),
      getNewColumns: [],
      setNewColumns: (aux: any[]) => set(() => ({ getNewColumns: aux })),
      getValoresColumn: [],
      setValoresColumn: (aux: any[]) => set(() => ({ getValoresColumn: aux })),

      getLoadingDonwload: false,
      setLoadingDonwload: (aux: boolean) =>
        set(() => ({ getLoadingDonwload: aux })),
      getUseColumnView: false,
      setUseColumnView: (aux: boolean) =>
        set(() => ({ getUseColumnView: aux })),

      getModalDonwloadView: false,
      setModalDonwloadView: (aux: boolean) =>
        set(() => ({ getModalDonwloadView: aux })),
      getUse: false,
      setUse: (aux: boolean) => set(() => ({ getUse: aux })),
    }),
    {
      name: "xx-form-store-xx",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
