import { create } from "zustand";

interface Props {
  getGeneralLoading: boolean;
  setGeneralLoading: (Productos: boolean) => void;
}

export const useLoadingStore = create<Props>()((set) => ({
  getGeneralLoading: false,
  setGeneralLoading: (aux: boolean) => set(() => ({ getGeneralLoading: aux })),
}));
