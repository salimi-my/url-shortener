import { create } from 'zustand';

interface useUrlModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useUrlModal = create<useUrlModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));
