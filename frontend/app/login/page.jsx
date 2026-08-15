"use client";
import { useState } from "react";
import { useAuthContext } from "../context/authContext.jsx";
import Loader from "@/components/Loader.jsx";

export default function Page() {
  const { handleLogin, handleRegister, isLoading } = useAuthContext();

  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignIn) {
      handleLogin(formData);
    } else {
      handleRegister(formData);
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/bg_campus_img.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 w-95 bg-transparent rounded-xl border-2 m-5 overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.7)]">
        <div className="p-4 text-blue-500 text-center text-3xl font-semibold">
          {isSignIn ? "SignIn" : "Create a new account"}
        </div>

        {/* Form */}
        <div className="w-full px-4 pb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Show Name only when Register */}
            {!isSignIn && (
              <>
                <div className="relative mb-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="w-full bg-transparent border-b border-gray-300 text-white px-2 py-3 outline-none focus:border-blue-500 peer"
                  />
                  <label className="absolute left-2 top-0 -translate-y-2/3 text-white text-sm transition-all peer-placeholder-shown:top-[70%] peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                    Name
                  </label>
                </div>
                <div className="relative mb-6">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="w-full bg-transparent border-b border-gray-300 text-white px-2 py-3 outline-none focus:border-blue-500 peer"
                  />
                  <label className="absolute left-2 top-0 -translate-y-1/2 text-white text-sm transition-all peer-placeholder-shown:top-[70%] peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                    Username
                  </label>
                </div>
              </>
            )}

            <div className="relative mb-6">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
                className="w-full bg-transparent border-b border-gray-300 text-white px-2 py-3 outline-none focus:border-blue-500 peer"
              />
              <label className="absolute left-2 top-0 -translate-y-1/2 text-white text-sm transition-all peer-placeholder-shown:top-[70%] peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                Email
              </label>
            </div>

            <div className="relative mb-6">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=""
                required
                className="w-full bg-transparent border-b border-gray-300 text-white px-2 py-3 outline-none focus:border-blue-500 peer"
              />
              <label className="absolute left-2 top-0 -translate-y-1/2 text-white text-sm transition-all peer-placeholder-shown:top-[70%] peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                Password
              </label>
            </div>

            {/* Footer */}
            <div className="flex text-white text-xs pl-2">
              {isSignIn ? (
                <p>Don't have an account</p>
              ) : (
                <p>I have already an account</p>
              )}

              {isSignIn ? (
                <button
                  type="button"
                  onClick={() => setIsSignIn(false)}
                  className="ml-2 text-blue-400 font-semibold underline hover:no-underline"
                >
                  Create
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSignIn(true)}
                  className="ml-2 text-blue-400 font-semibold underline hover:no-underline"
                >
                  SignIn
                </button>
              )}
            </div>

            {/* Submit button */}
            {isLoading ? (
              <Loader size="md" />
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-500 transition mt-4"
              >
                {isSignIn ? "Login" : "Register"}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
