"use client";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useProfileStore from "../store/ProfileStore";
import Loading from "../components/Loading";

const InterestCard = () => {
  const router = useRouter();
  const { profile, isLoadingProfile } = useProfileStore();
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    if (profile.interests?.length) {
      setInterests(profile.interests);
    }
  }, [profile.interests]);

  const handleEditInterest = () => {
    router.push("/interest");
  };

  return (
    <div className="w-full min-h-32 p-3 rounded-2xl bg-card">
      {isLoadingProfile ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Interest</h2>
            <div onClick={handleEditInterest}>
              <Pencil className="w-4 cursor-pointer" />
            </div>
          </div>
          {!interests?.length && <p className="opacity-85">Add in your interest to help others know you better</p>}
          {interests?.length > 0 && (
            <div className="interest flex items-center gap-3 flex-wrap">
              {interests?.length > 0 &&
                interests.map((item: string, i: number) => (
                  <span key={i} className="py-2 px-4 rounded-full bg-box">
                    {item}
                  </span>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default InterestCard;
