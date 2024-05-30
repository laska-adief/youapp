"use client";

import { ChevronLeft, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useProfileStore from "../store/ProfileStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getProfile, updateProfile } from "../services/ProfileService";
import { useMutation, useQuery } from "react-query";
import { UserDto } from "../types/UserDto";

const InterestForm = () => {
  const router = useRouter();
  const { rehydrated, isLogin, access_token } = useProfileStore();
  const { data } = useQuery({
    queryKey: "getProfile",
    queryFn: () => getProfile(access_token),
    enabled: !!access_token,
  });
  const [interests, setInterests] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (rehydrated) {
      if (!isLogin) {
        router.push("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rehydrated]);

  useEffect(() => {
    if (data?.data?.interests?.length) {
      setInterests(data?.data?.interests);
    }
  }, [data?.data?.interests]);

  const mutationUpdate = useMutation({
    mutationKey: "updateProfile",
    mutationFn: ({ data, token }: { data: UserDto; token: string }) => updateProfile(data, token),
    onSuccess: (data) => {
      router.push("/");
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleAddInterest = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = event.currentTarget.value;
      if (value) {
        setInterests([...interests, value]);
      }
      event.currentTarget.value = "";
    }
  };

  const handleFocusInput = () => {
    if (inputRef) inputRef.current?.focus();
  };

  const removeInterest = (i: number) => {
    const dataInterest = interests;
    const newDataInterest = dataInterest.filter((item: string, itemIndex: number) => itemIndex !== i);
    setInterests(newDataInterest);
  };

  const handleSaveInterest = () => {
    const currData = data?.data;
    const updatedData = { ...currData, interests: interests };

    mutationUpdate.mutate({ data: updatedData, token: access_token });
  };

  return (
    <>
      <div className="w-full flex items-center justify-between mb-16">
        <Link href={"/"} className="cursor-pointer flex items-center">
          <ChevronLeft className="w-5" /> Back
        </Link>
        <span className="cursor-pointer" onClick={handleSaveInterest}>
          Save
        </span>
      </div>

      <span className="mb-3 text-transparent bg-clip-text bg-gradient-golden font-medium">Tell everyone about yourself</span>
      <h3 className="font-bold mb-9">What interest you?</h3>
      {!interests.length && <input type="text" className="form-control" onKeyDown={handleAddInterest} />}
      {interests.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap bg-interest-box rounded-xl py-2 px-4" onClick={handleFocusInput}>
          {interests.map((item: string, i: number) => (
            <span className="w- full py-1 px-2 rounded bg-interest-item flex items-center justify-between gap-2" key={i}>
              <span className="break-all">{item}</span>
              <span onClick={() => removeInterest(i)}>
                <X className="w-3 h-3 cursor-pointer" />
              </span>
            </span>
          ))}
          <input type="text" ref={inputRef} className="form-control bg-transparent p-2" onKeyDown={handleAddInterest} />
        </div>
      )}
    </>
  );
};
export default InterestForm;
