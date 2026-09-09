import { ReviewWithUserT } from '@/types/ReviewT';
import { create } from 'zustand';

type Reviews = {
  reviews: ReviewWithUserT[];
  setReviews: (value: ReviewWithUserT[]) => void;
  addReview: (value: ReviewWithUserT) => void;
  deleteReview: (value: string) => void;
};

export const useReviews = create<Reviews>((set) => ({
  reviews: [],
  setReviews: (value) => set({ reviews: value }),
  addReview: (value) => set((state) => ({ reviews: [...state.reviews, value] })),
  deleteReview: (value) =>
    set((state) => ({ reviews: state.reviews.filter((review) => review.id !== value) })),
}));
