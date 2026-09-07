"use client";
import { memo, useState, useEffect } from "react";
import { SquarePen, ArrowLeft  } from "lucide-react";
import usePostContext from "@/app/context/postContext";
import Loader from "@/components/Loader.jsx";

function ProfileForm({ profile }) {
  const { isLoading, editProfile } = usePostContext();
  const [previewUrl, setPreviewUrl] = useState(profile?.profilePic);

  const [profileData, setProfileData] = useState({
    name: profile?.owner?.name,
    username: profile?.owner?.username,
    bio: profile?.bio,
    gender: profile?.gender,
    dateOfBirth: profile?.dateOfBirth?.split("T")[0],
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", profileData.name);
    formData.append("username", profileData.username);
    formData.append("bio", profileData.bio);
    formData.append("gender", profileData.gender);
    formData.append("dateOfBirth", profileData.dateOfBirth);

    if (profileData.profilePic) {
      formData.append("profilePic", profileData.profilePic);
    }
    if (previewUrl === "/default_img.avif") {
      formData.append("profilePic", previewUrl);
    }

    editProfile(formData);
  };

  useEffect(() => {
    if (!profileData?.profilePic) return;

    const url = URL.createObjectURL(profileData?.profilePic);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [profileData?.profilePic]);
  
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-150 mx-auto px-4 py-2 bg-white flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <div className="flex flex-col justify-between gap-5 sm:flex-row">
          {/* Profile Picture Preview */}
          <div className="relative max-w-35 w-30 mx-auto sm:mx-0 rounded-full flex justify-center bg-[#000000d4]">
            <img
              src={previewUrl}
              alt="preview"
              className="max-w-35 max-h-35 w-30 h-30 object-fill rounded-full border-3 border-indigo-400"
            />
            <SquarePen
              className="size-5 bg-white rounded-sm absolute bottom-1.5 right-3 cursor-pointer"
              onClick={() =>
                setPreviewUrl((prev) => (prev = "/default_img.avif"))
              }
            />
            <span className="absolute bottom-0 -right-23 text-[11px] flex justify-center items-center bg-gray-200 p-1 rounded animate-bounce">
              <ArrowLeft size={15} />
              remove profile
            </span>
          </div>

          {/* Profile Picture */}
          <div className="flex-1 flex flex-col">
            <label className="text-[14px]">Profile Image</label>
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="border border-neutral-300 p-2 bg-gray-100 rounded cursor-pointer
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-x-2 gap-y-4 sm:flex-row">
          {/* Name */}
          <div className="flex-1 flex flex-col">
            <label className="text-[14px]">Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g - campusforum"
              value={profileData.name}
              onChange={handleChange}
              className="border border-neutral-300 p-2 outline-[#3b82f6] bg-gray-100 rounded cursor-pointer"
            />
          </div>

          {/* Username */}
          <div className="flex-1 flex flex-col">
            <label className="text-[14px]">Username</label>
            <input
              type="text"
              name="username"
              placeholder="e.g - @campusforum"
              value={profileData.username}
              onChange={handleChange}
              className="border border-neutral-300 p-2 outline-[#3b82f6] bg-gray-100 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col">
          <label className="text-[14px]">Bio</label>
          <textarea
            name="bio"
            placeholder="Write your bio..."
            value={profileData.bio}
            onChange={handleChange}
            className="border border-neutral-300 p-2 outline-[#3b82f6] bg-gray-100 rounded resize-none cursor-pointer"
            rows={3}
            maxLength={300}
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col justify-between gap-x-2 gap-y-4 md:flex-row">
          <div className="flex-1 flex flex-col">
            <label className="text-[14px]">Gender</label>
            <select
              name="gender"
              value={profileData.gender}
              onChange={handleChange}
              className="border border-neutral-300 p-2 outline-[#3b82f6] bg-gray-100 rounded cursor-pointer"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className="flex-1 flex flex-col">
            <label className="text-[14px]">DOB</label>
            <input
              type="date"
              name="dateOfBirth"
              value={profileData.dateOfBirth}
              onChange={handleChange}
              className="border border-neutral-300 p-2 outline-[#3b82f6] bg-gray-100 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Submit */}
        {isLoading ? (
          <Loader size="sm" text2="it may take time" />
        ) : (
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md 
                        active:bg-blue-50 active:outline-black active:text-black hover:bg-blue-700 transition 
                        text-sm sm:text-base cursor-pointer"
          >
            Save Profile
          </button>
        )}
      </form>
    </>
  );
}

export default memo(ProfileForm);
