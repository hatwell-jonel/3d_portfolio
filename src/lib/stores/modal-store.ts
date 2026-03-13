import { create } from "zustand";
import { ModalType } from "@/lib/types";


type ModalState = {
  activeModal: ModalType | null;
  setModal: (modal: ModalType) => void;
  clearModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  setModal: (modal) => set({ activeModal: modal }),
  clearModal: () => set({ activeModal: null}),
}));
