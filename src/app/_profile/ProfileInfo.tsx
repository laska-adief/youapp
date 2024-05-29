"use client";

import { Pencil } from "lucide-react";
import useProfileStore from "../store/ProfileStore";
import { getAge } from "../utils/getAge";

const ProfileInfo = () => {
  const { profile, setIsEditProfile } = useProfileStore();

  const handleEditProfile = () => {
    setIsEditProfile(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold">About</h2>
        <>
          <span onClick={handleEditProfile}>
            <Pencil className="w-4 cursor-pointer" />
          </span>
        </>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-field">Birthday: </span>
          <span className="font-medium">
            {profile?.birthday} (Age {getAge(profile?.birthday)})
          </span>
        </div>
        <div>
          <span className="text-field">Horoscope: </span>
          <span className="font-medium">{profile?.horoscope}</span>
        </div>
        <div>
          <span className="text-field">Zodiac: </span>
          <span className="font-bold">{profile?.zodiac}</span>
        </div>
        <div>
          <span className="text-field">Height: </span>
          <span className="font-bold">{profile?.height} cm</span>
        </div>
        <div>
          <span className="text-field">Weight: </span>
          <span className="font-bold">{profile?.weight} kg</span>
        </div>
      </div>
    </>
  );
};
export default ProfileInfo;
