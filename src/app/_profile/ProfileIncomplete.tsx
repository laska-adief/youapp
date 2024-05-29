import { useMutation } from "react-query";
import useProfileStore from "../store/ProfileStore";
import { Pencil } from "lucide-react";
import { createProfile } from "../services/ProfileService";
import { UserDto } from "../types/UserDto";

const ProfileIncomplete = () => {
  const { isNewUser, isEditProfile, access_token, setProfile, setIsNewUser, setIsEditProfile } = useProfileStore();

  const mutationCreate = useMutation({
    mutationKey: "createProfile",
    mutationFn: ({ data, token }: { data: UserDto; token: string }) => createProfile(data, token),
    onSuccess: (data) => {
      setProfile(data?.data);
      setIsNewUser(false);
      setIsEditProfile(true);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleCreateProfile = () => {
    const initialValues = {
      name: "",
      birthday: "",
      height: 0,
      weight: 0,
      interests: [],
    };
    mutationCreate.mutate({ data: initialValues, token: access_token });
    setIsEditProfile(!isEditProfile);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold">About</h2>
        <>
          <span onClick={handleCreateProfile}>
            <Pencil className="w-4 cursor-pointer" />
          </span>
        </>
      </div>
      {isNewUser && !isEditProfile && <p className="opacity-85">Add in your profile to help others know you better</p>}
    </>
  );
};
export default ProfileIncomplete;
