"use client";
import { useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { useAuthContext } from "@/app/context/authContext";

export default function GlassAuthForm() {
  const { handleRegister, handleLogin, isLoading } = useAuthContext();
  const [mode, setMode] = useState("signin");
  const [agree, setAgree] = useState(true);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const isSignIn = mode === "signin";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isSignIn){
      await handleLogin(form);
    }else{
      await handleRegister(form);
    }
    setForm({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center p-6">

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-2xl">
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-orange-400 shadow-lg shadow-indigo-500/20">
              <img src="/campus.png" alt="logo" />
            </div>
            <h1 className="text-2xl font-medium text-white">
              {isSignIn ? "Welcome back" : "Create your account"}
              <p className="text-sm">on campus <b className="text-orange-400">forum</b></p>
            </h1>
          </div>
        </div>

        {/* Mode toggle */}
        <div className="mb-6 grid grid-cols-2 rounded-xl border border-white/15 bg-white/5 p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`rounded-lg py-1.5 font-medium transition ${
              isSignIn ? "bg-white/15 text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-lg py-1.5 font-medium transition ${
              !isSignIn ? "bg-white/15 text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <>
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs text-slate-300">
                  Name
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 transition focus-within:border-indigo-300/60 focus-within:bg-white/10">
                  <User className="h-4 w-4 shrink-0 text-slate-300" />
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Enter name"
                    className="w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs text-slate-300">
                  Username
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 transition focus-within:border-indigo-300/60 focus-within:bg-white/10">
                  <User className="h-4 w-4 shrink-0 text-slate-300" />
                  <input
                    id="username"
                    type="text"
                    required
                    value={form.username}
                    onChange={update("username")}
                    placeholder="Enter username"
                    className="w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs text-slate-300">
              Email
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 transition focus-within:border-indigo-300/60 focus-within:bg-white/10">
              <Mail className="h-4 w-4 shrink-0 text-slate-300" />
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                placeholder="Enter email"
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="block text-xs text-slate-300">
                Password
              </label>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 transition focus-within:border-indigo-300/60 focus-within:bg-white/10">
              <Lock className="h-4 w-4 shrink-0 text-slate-300" />
              <input
                id="password"
                type="password"
                required
                value={form.password}
                onChange={update("password")}
                placeholder={isSignIn ? "Enter your password" : "Create a password"}
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none"
              />
            </div>
          </div>

          {isSignIn ? (
            <label className="flex select-none items-center gap-2 pt-1 text-xs text-slate-300">
              <a href="#" className="text-xs text-indigo-200 hover:text-indigo-100">
                Forgot Password?
              </a>
            </label>
          ) : (
            <label className="flex select-none items-start gap-2 pt-1 text-xs text-slate-300">
              <input
                type="checkbox"
                required
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-white/30 bg-white/10 accent-indigo-400"
              />
              I agree to the Terms of Service and Privacy Policy
            </label>
          )}

          <button
            type="submit"
            className={`group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-orange-400 py-2.5 text-sm font-medium text-white transition hover:brightness-110 active:brightness-95 ${isLoading && "animate-pulse bg-gray-400"}`}
          >
            {isLoading ? (isSignIn ? "Signed in" : "Account created") : isSignIn ? "Sign in" : "Create account"}
            {!isLoading && (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}