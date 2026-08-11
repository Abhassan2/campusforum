"use client";
import { PostContext } from "@/app/context/postContext.jsx";
import Loader from "@/components/Loader";
import { useContext, useState } from "react";
import { FaUniversity } from "react-icons/fa";

export default function ProfileEditPage() {
  const { isLoading, editProfile } = useContext(PostContext);

  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    bio: "",
    gender: "",
    dateOfBirth: "",
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

    editProfile(formData);
  };
  return (
    <div>
      <header className="flex px-3 py-2 mb-4 border-b border-neutral-300">
        <div className="flex gap-3 items-center">
          <FaUniversity className="text-[30px] text-blue-700" />
          <h1 className="text-[16px] font-semibold">Campus Forum</h1>
        </div>
      </header>
      
      <form
        onSubmit={handleSubmit}
        className="max-w-150 mx-auto px-4 py-2 bg-white flex flex-col gap-4"
        encType="multipart/form-data"
      >
        {/* Profile Picture */}
        <div className="flex flex-col">
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

        {/* Name */}
        <div className="flex flex-col">
          <label className="text-[14px]">Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g - moon"
            value={profileData.name}
            onChange={handleChange}
            className="border border-neutral-300 p-2 outline-[#3b82f6] bg-gray-100 rounded cursor-pointer"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label className="text-[14px]">Username</label>
          <input
            type="text"
            name="username"
            placeholder="e.g - @moon"
            value={profileData.username}
            onChange={handleChange}
            className="border border-neutral-300 p-2 outline-[#3b82f6] bg-gray-100 rounded cursor-pointer"
          />
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
        <div className="flex flex-col">
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
        <div className="flex flex-col">
          <label className="text-[14px]">DOB</label>
          <input
            type="date"
            name="dateOfBirth"
            value={profileData.dateOfBirth}
            onChange={handleChange}
            className="border border-neutral-300 p-2 outline-[#3b82f6] bg-gray-100 rounded cursor-pointer"
          />
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
    </div>
  );
}
