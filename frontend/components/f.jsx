import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  ArrowRight,
  Check,
} from "lucide-react";

export default function F() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/campus-bg.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Login wrapper */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        <div
          className="
            w-full max-w-md
            rounded-3xl
            border border-white/30
            bg-linear-to-br
            from-purple-500/25
            via-blue-500/20
            to-pink-500/25
            p-6 sm:p-8
            shadow-[0_25px_80px_rgba(80,40,180,0.35)]
            backdrop-blur-2xl
        "
        >
          {/* Header */}
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/15">
              <GraduationCap
                size={34}
                strokeWidth={1.8}
                className="text-white"
              />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-white/70 sm:text-base">
              Sign in to continue your journey
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="
                  h-14 w-full rounded-xl
                  border border-white/25
                  bg-white/10
                  pl-12 pr-4
                  text-white
                  outline-none
                  placeholder:text-white/55
                  transition
                  focus:border-white/50
                  focus:bg-white/15
                  focus:ring-2
                  focus:ring-white/20
                "
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70"
              />

              <input
                type="password"
                placeholder="Password"
                className="
                  h-14 w-full rounded-xl
                  border border-white/25
                  bg-white/10
                  pl-12 pr-12
                  text-white
                  outline-none
                  placeholder:text-white/55
                  transition
                  focus:border-white/50
                  focus:bg-white/15
                  focus:ring-2
                  focus:ring-white/20
                "
              />

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 transition hover:text-white"
              >
                <Eye size={20} />
              </button>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-white/75">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500">
                  <Check size={15} strokeWidth={3} className="text-white" />
                </span>

                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="text-blue-300 transition hover:text-blue-200"
              >
                Forgot password?
              </button>
            </div>

            {/* Login */}
            <button
              type="submit"
              className="
                group mt-2 flex h-14 w-full
                items-center justify-center gap-3
                rounded-xl
                bg-linear-to-r from-blue-500 to-indigo-500
                font-semibold text-white
                shadow-lg shadow-blue-900/20
                transition
                hover:scale-[1.01]
                hover:from-blue-400
                hover:to-indigo-400
                active:scale-[0.99]
              "
            >
              Login
              <ArrowRight
                size={21}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/25" />

            <span className="text-sm text-white/60">OR</span>

            <div className="h-px flex-1 bg-white/25" />
          </div>

          {/* Google */}
          <button
            type="button"
            className="
              flex h-14 w-full
              items-center justify-center gap-3
              rounded-xl
              border border-white/25
              bg-white/10
              font-medium text-white
              backdrop-blur-md
              transition
              hover:bg-white/20
            "
          >
            {/* Google G */}
            <span className="text-xl font-bold text-white">G</span>
            Continue with Google
          </button>

          {/* Sign up */}
          <p className="mt-7 text-center text-sm text-white/65">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-medium text-blue-300 transition hover:text-blue-200"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
