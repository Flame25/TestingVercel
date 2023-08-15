import { create } from "zustand"

interface CreateDaftarModalProps {
    open: boolean,
    onOpenDaftar: () => void,
    onCloseDaftar: () => void
}

const useCreateDaftarModal = create<CreateDaftarModalProps>((set) => ({
    open: false,
    onOpenDaftar: () => set({ open: true }),
    onCloseDaftar: () => set({ open: false }),
}))

export default useCreateDaftarModal
