"use client";

import { useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileForm from "./ProfileForm";
import useProfileStore from "../store/ProfileStore";
import { useRouter } from "next/navigation";
import ProfileIncomplete from "./ProfileIncomplete";
import { useQuery } from "react-query";
import { getProfile } from "../services/ProfileService";
import Loading from "../components/Loading";

const ProfileCard = () => {
  const router = useRouter();
  const { rehydrated, isNewUser, isLogin, isEditProfile, isLoadingProfile, access_token, setIsLoadingProfile, setIsNewUser, setProfile } =
    useProfileStore();

  const { data, isLoading } = useQuery({
    queryKey: "getProfile",
    queryFn: () => getProfile(access_token),
    enabled: access_token ? true : false,
    onSuccess(data) {
      setIsLoadingProfile(false);
      setProfile(data?.data);
      if (data?.data?.name || data?.data?.birthday) {
        setIsNewUser(false);
      } else {
        setIsNewUser(true);
      }
    },
  });

  useEffect(() => {
    if (rehydrated) {
      if (!isLogin) {
        router.push("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rehydrated]);

  return (
    <div className="w-full min-h-32 p-3 mb-5 rounded-2xl bg-card">
      {isLoadingProfile && <Loading />}
      {!isLoadingProfile && (
        <>
          {isNewUser && !isEditProfile && <ProfileIncomplete />}
          {!isNewUser && !isEditProfile && <ProfileInfo />}
          {!isNewUser && isEditProfile && <ProfileForm />}
        </>
      )}
    </div>
  );
};

export default ProfileCard;
