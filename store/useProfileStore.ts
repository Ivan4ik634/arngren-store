import { UserT } from '@/types/UserT';
import { create } from 'zustand';

type ProfileStore = {
  profileStore: UserT | null;
  setProfileStore: (value: UserT | null) => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profileStore: null,
  setProfileStore: (value) => set({ profileStore: value }),
}));
