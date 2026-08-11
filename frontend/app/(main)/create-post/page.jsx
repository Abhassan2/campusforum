"use client";
import { PostContext } from "@/app/context/postContext";
import { useContext, useEffect, useState } from "react";
import { FaUniversity } from "react-icons/fa";
import Loader from "@/components/Loader";

export default function CreatePostPage() {
  const { uploadPost, isLoading } = useContext(PostContext);

  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadPost(file, caption);
  };

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);
  return (
    <div className="pb-10">
      {/* create post header */}
      <header className="flex px-3 py-2 mb-4 border-b border-neutral-300">
        <div className="flex gap-3 items-center">
          <FaUniversity className="text-[30px] text-blue-700" />
          <h1 className="text-[16px] font-semibold">Campus Forum</h1>
        </div>
      </header>

      {/* create post body */}
      <div className="px-2 flex flex-col md:px-4 lg:mx-20 gap-5">
        <div>
          <h1 className="text-xl sm:text-3xl font-semibold">Create Post</h1>
          <p className="text-[14px] sm:text-base text-neutral-700">
            Share your moments with your community
          </p>
        </div>

        {previewUrl && (
          <div className="relative max-w-200 flex justify-center bg-[#000000d4] rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="size-6 md:size-7 text-[#3e3d3d] absolute top-1 right-3 cursor-pointer"
              onClick={() => setPreviewUrl(null)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            {file?.type.includes("image/") ? (
              <img
                src={previewUrl}
                alt="preview"
                className=" w-full object-contain max-h-90"
              />
            ) : (
              <video
                src={previewUrl}
                controls
                className="w-full max-h-100 max-w-md rounded"
              />
            )}
          </div>
        )}

        <div className=" flex flex-col border border-dashed rounded-md p-4 max-w-200">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:p-2 sm:gap-6 lg:max-w-3xl"
            encType="multipart/form-data"
          >
            {/* File Upload (image/video) */}
            <input
              type="file"
              accept="image/*,video/*"
              name="mediaFile"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full cursor-pointer text-sm text-gray-500
                        border border-gray-300 rounded-md p-2
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
              required
            />

            <textarea
              className="border p-2 cursor-pointer rounded-md w-full min-h-25 text-sm sm:text-base"
              placeholder="Write your caption..."
              value={caption}
              name="caption"
              maxLength="300"
              onChange={(e) => setCaption(e.target.value)}
              required
            />

            {/* Submit Button */}
            {isLoading ? (
              <Loader size="md" text2="Uploading, this may take some time" />
            ) : (
              <button
                type="submit"
                className="bg-blue-600 cursor-pointer text-white py-2 rounded-md 
                        active:bg-blue-50 active:outline-black active:text-black hover:bg-blue-700 transition 
                        text-sm sm:text-base"
              >
                Publish
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
