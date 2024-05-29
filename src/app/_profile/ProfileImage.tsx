"use client";

import { Pencil } from "lucide-react";
import Image from "next/image";
import { useQuery } from "react-query";
import { getProfile } from "../services/ProfileService";
import useProfileStore from "../store/ProfileStore";

const ProfileImage = () => {
  const { access_token, isEditProfile, setIsEditProfile } = useProfileStore();
  const { data } = useQuery({
    queryKey: "getProfile",
    queryFn: () => getProfile(access_token),
    enabled: access_token ? true : false,
  });

  const image =
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";

  const handleEditProfile = () => {
    setIsEditProfile(true);
  };

  return (
    <div className="w-full min-h-48 relative rounded-2xl bg-card mb-6 overflow-hidden">
      {image && (
        <Image src={image} alt={"profile"} fill={true} sizes="30vw" style={{ objectFit: "cover" }} className="bg-cover" priority={true} />
      )}
      {!isEditProfile && <Pencil className="absolute top-2 right-3 w-4 cursor-pointer" onClick={handleEditProfile} />}
      {data?.data?.username && <div className="absolute bottom-4 left-4 font-bold">{data?.data?.name || "@" + data?.data?.username},</div>}
    </div>
  );
};
export default ProfileImage;
