import { UnitModalData } from '@/types';
import { create } from "zustand"

interface UnitModalProps {
    open: boolean,
    data: UnitModalData,
    setData: (d: UnitModalData) => void,
    onOpen: () => void,
    onClose: () => void,
}

const useUnitModal = create<UnitModalProps>((set) => ({
    open: false,
    data: {nama:"", desc: "", details: []},
    setData: (d) => set({ data: d }),
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false}),
}))

export default useUnitModal