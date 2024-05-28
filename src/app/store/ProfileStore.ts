import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";
import { UserDto } from "../types/UserDto";
import { create } from "zustand";

interface ProfileProps {
  access_token: string;
  profile: UserDto;
  isLogin: boolean;
  isNewUser: boolean;
  isEditProfile: boolean;
  isLoadingProfile: boolean;
  rehydrated: boolean;
  setAccessToken: (token: string) => void;
  setProfile: (profile: UserDto) => void;
  setIsLogin: (isLogin: boolean) => void;
  setIsNewUser: (isNewUser: boolean) => void;
  setIsEditProfile: (isEditProfile: boolean) => void;
  setIsLoadingProfile: (isLoadingProfile: boolean) => void;
  setRehydrated: (rehydrated: boolean) => void;
}

const storageKey = process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY || "youapp";

const initialData = {
  name: "",
  birthday: "",
  height: 0,
  weight: 0,
  interests: [],
};

const persistOptions: PersistOptions<ProfileProps> = {
  name: storageKey,
  onRehydrateStorage: () => (state) => state?.setRehydrated(true),
};

const useProfileStore = create(
  persist(
    (set) => ({
      access_token: "",
      profile: initialData,
      isLogin: false,
      isNewUser: true,
      isEditProfile: false,
      isLoadingProfile: true,
      rehydrated: false,
      setAccessToken: (value: string) => set({ access_token: value }),
      setProfile: (value: UserDto) => set({ profile: value }),
      setIsLogin: (value: boolean) => set({ isLogin: value }),
      setIsNewUser: (value: boolean) => set({ isNewUser: value }),
      setIsEditProfile: (value: boolean) => set({ isEditProfile: value }),
      setIsLoadingProfile: (value: boolean) => set({ isLoadingProfile: value }),
      setRehydrated: (rehydrated) => set({ rehydrated }),
    }),
    persistOptions
  )
);

// const useProfileStore = create<ProfileProps>()((set) => ({
//   access_token: "",
//   profile: initialData,
//   isLogin: false,
//   isNewUser: true,
//   isEditProfile: false,
//   setAccessToken: (value: string) => set({ access_token: value }),
//   setProfile: (value: UserDto) => set({ profile: value }),
//   setIsLogin: (value: boolean) => set({ isLogin: value }),
//   setIsNewUser: (value: boolean) => set({ isNewUser: value }),
//   setIsEditProfile: (value: boolean) => set({ isEditProfile: value }),
// }));

export default useProfileStore;
