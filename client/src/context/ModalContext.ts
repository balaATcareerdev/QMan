import type { SelectedServiceType } from "@/pages/Client/Home";
import { createContext, useContext } from "react";

export interface ModalContextType {
  setOpenEditModal: (open: boolean) => void;
  openEditModal: boolean;

  selectedService: SelectedServiceType | null;
  setSelectedService: (service: SelectedServiceType) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
