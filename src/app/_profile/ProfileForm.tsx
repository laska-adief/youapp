import { useFormik } from "formik";
import { Plus } from "lucide-react";
import { useRef } from "react";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { updateProfile } from "../services/ProfileService";
import useProfileStore from "../store/ProfileStore";
import { UserDto } from "../types/UserDto";

const ProfileForm = () => {
  const gender = null;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { profile, access_token, setIsEditProfile } = useProfileStore();

  const handleUploadFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formik = useFormik({
    initialValues: {
      image: profile?.image || "",
      name: profile?.name || "",
      birthday: profile?.birthday || "",
      horoscope: profile?.horoscope || "--",
      zodiac: profile?.zodiac || "--",
      height: profile?.height || 0,
      weight: profile?.weight || 0,
      interests: profile?.interests || [],
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      birthday: Yup.string(),
      height: Yup.number(),
      weight: Yup.number(),
    }),
    onSubmit: (values) => {
      const newData = {
        name: values.name,
        birthday: values.birthday,
        height: values.height,
        weight: values.weight,
      };
      mutationUpdate.mutate({ data: newData, token: access_token });
    },
  });

  const queryClient = useQueryClient();
  const mutationUpdate = useMutation({
    mutationKey: "updateProfile",
    mutationFn: ({ data, token }: { data: UserDto; token: string }) => updateProfile(data, token),
    onSuccess: (data) => {
      setIsEditProfile(false);
      queryClient.invalidateQueries(["getProfile"]);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleSaveUpdate = () => {
    formik.handleSubmit();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold">About</h2>
        <span className="text-transparent bg-clip-text bg-gradient-golden font-medium cursor-pointer" onClick={handleSaveUpdate}>
          Save & Update
        </span>
      </div>
      <form className="mb-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-box rounded-xl w-14 h-14 flex items-center justify-center cursor-pointer" onClick={handleUploadFile}>
            <Plus className="w-5 h-5" />
            <input type="file" id="image" ref={fileInputRef} className="hidden" onChange={formik.handleChange} />
          </div>
          <p>Add image</p>
        </div>
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="name">Display name:</label>
          <input
            type="text"
            id="name"
            value={formik.values.name}
            placeholder="Enter name"
            className="form-control-profile"
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="gender">Gender:</label>
          <select name="gender" id="gender" className={`form-control-profile ${gender ? "" : "text-placeholder"}`}>
            <option value="" hidden className="hidden">
              Select Gender
            </option>
            <option value="male" className="bg-card">
              Male
            </option>
            <option value="female" className="bg-card">
              Female
            </option>
          </select>
        </div>
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            value={formik.values.birthday}
            className={`form-control-profile input-date ${formik.values.birthday ? "text-white" : "text-placeholder"}`}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="horoscope">Horoscope:</label>
          <input type="text" id="horoscope" value={formik.values.horoscope} readOnly placeholder="--" className="form-control-profile" />
        </div>
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="zodiac">Zodiac:</label>
          <input type="text" id="zodiac" value={formik.values.zodiac} readOnly placeholder="--" className="form-control-profile" />
        </div>
        <div className="flex items-center justify-between mb-3 relative">
          <label htmlFor="height">Height:</label>
          <input
            type="number"
            id="height"
            value={formik.values.height}
            placeholder="Add height"
            className="form-control-profile input-number pr-9"
            onChange={formik.handleChange}
          />
          <span className="absolute top-2 right-2 text-placeholder">cm</span>
        </div>
        <div className="flex items-center justify-between mb-3 relative">
          <label htmlFor="weight">Weight:</label>
          <input
            type="number"
            id="weight"
            value={formik.values.weight}
            placeholder="Add weight"
            className="form-control-profile input-number pr-9"
            onChange={formik.handleChange}
          />
          <span className="absolute top-2 right-2 text-placeholder">kg</span>
        </div>
      </form>
    </>
  );
};
export default ProfileForm;
