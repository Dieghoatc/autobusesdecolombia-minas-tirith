import { create } from "zustand";

interface ShowSidebarMenuStore {
  openDesktop: boolean;
  openMobile: boolean;
  setOpenDesktop: (open: boolean) => void;
  setOpenMobile: (open: boolean) => void;
}

export const useShowSidebarMenu = create<ShowSidebarMenuStore>((set) => ({
  openDesktop: false,
  openMobile: false,
  setOpenDesktop: (open: boolean) => set({ openDesktop: open }),
  setOpenMobile: (open: boolean) => set({ openMobile: open }),
}));

export default useShowSidebarMenu