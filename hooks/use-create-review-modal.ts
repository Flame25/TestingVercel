import { create } from "zustand"

interface CreateReviewModalProps {
    open: boolean,
    onOpenReview: () => void,
    onCloseReview: () => void
}

const useCreateReviewModal = create<CreateReviewModalProps>((set) => ({
    open: false,
    onOpenReview: () => set({ open: true }),
    onCloseReview: () => set({ open: false }),
}))

export default useCreateReviewModal