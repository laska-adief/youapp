"use client";

import ProfileCard from "./ProfileCard";
import ProfileImage from "./ProfileImage";
import { ChevronLeft } from "lucide-react";
import useProfileStore from "../store/ProfileStore";
import { useRouter } from "next/navigation";

const ProfileSection = () => {
  const router = useRouter();
  const { profile, isEditProfile, setIsEditProfile, setProfile, setAccessToken, setIsLogin } = useProfileStore();

  const handleBack = () => {
    const initialData = {
      name: "",
      birthday: "",
      height: 0,
      weight: 0,
      interests: [],
    };
    if (isEditProfile) {
      setIsEditProfile(false);
    } else {
      router.push("/login");
      setProfile(initialData);
      setAccessToken("");
      setIsLogin(false);
    }
  };
  return (
    <>
      <div className="w-full grid grid-cols-3 items-center justify-between mb-7">
        <div onClick={handleBack} className="cursor-pointer flex items-center">
          <ChevronLeft className="w-5" /> Back
        </div>
        <div className="text-center">{profile.username ? "@" + profile.username : ""}</div>
      </div>
      <ProfileImage />
      <ProfileCard />
    </>
  );
};
export default ProfileSection;
