import {
  GraduationCap,
  User,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function Signup() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/campus-bg.jpg')",
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Signup wrapper */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">

        {/* Glass Card */}
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
            <div
              className="
                mx-auto mb-4 flex h-16 w-16
                items-center justify-center
                rounded-2xl
                border border-white/30
                bg-linear-to-br
                from-cyan-400/30
                to-purple-500/30
              "
            >
              <GraduationCap
                size={34}
                className="text-white"
              />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-white/70">
              Start your journey with us
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">

            {/* Name */}
            <div className="relative">
              <User
                size={20}
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-white/70
                "
              />

              <input
                type="text"
                placeholder="Name"
                required
                className="
                  h-14 w-full rounded-xl
                  border border-white/25
                  bg-white/10
                  pl-12 pr-4
                  text-white
                  outline-none
                  placeholder:text-white/55
                  backdrop-blur-md
                  transition
                  focus:border-cyan-300/60
                  focus:bg-white/15
                  focus:ring-2
                  focus:ring-cyan-300/20
                "
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail
                size={20}
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-white/70
                "
              />

              <input
                type="email"
                placeholder="Email Address"
                required
                className="
                  h-14 w-full rounded-xl
                  border border-white/25
                  bg-white/10
                  pl-12 pr-4
                  text-white
                  outline-none
                  placeholder:text-white/55
                  backdrop-blur-md
                  transition
                  focus:border-cyan-300/60
                  focus:bg-white/15
                  focus:ring-2
                  focus:ring-cyan-300/20
                "
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                size={20}
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-white/70
                "
              />

              <input
                type="password"
                placeholder="Password"
                required
                className="
                  h-14 w-full rounded-xl
                  border border-white/25
                  bg-white/10
                  pl-12 pr-4
                  text-white
                  outline-none
                  placeholder:text-white/55
                  backdrop-blur-md
                  transition
                  focus:border-cyan-300/60
                  focus:bg-white/15
                  focus:ring-2
                  focus:ring-cyan-300/20
                "
              />
            </div>

            {/* Terms */}
            {/* <label className="flex cursor-pointer items-start gap-3 pt-1">
              <input
                type="checkbox"
                className="
                  mt-1 h-4 w-4
                  accent-purple-500
                "
              />

              <span className="text-sm text-white/70">
                I agree to the{" "}
                <span className="text-cyan-300 hover:underline">
                  Terms & Conditions
                </span>
              </span>
            </label> */}
            <div className="flex justify-between px-1 text-sm">
              <label className="flex gap-2">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a href="#forgot" className="text-[#987ffc] hover:underline">Forgot password?</a>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="
                group mt-2 flex h-14 w-full
                items-center justify-center gap-3
                rounded-xl
                bg-linear-to-r
                from-cyan-400
                via-blue-500
                to-purple-600
                font-semibold text-white
                shadow-lg
                shadow-purple-500/30
                transition-all
                hover:scale-[1.02]
                hover:shadow-purple-500/50
                active:scale-[0.99]
              "
            >
              Create Account

              <ArrowRight
                size={21}
                className="
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </button>
          </form>

          {/* Login */}
          <p className="mt-7 text-center text-sm text-white/65">
            Already have an account?{" "}

            <button
              type="button"
              className="
                font-medium
                text-cyan-300
                transition
                hover:text-cyan-200
                hover:underline
              "
            >
              Login
            </button>
          </p>

        </div>
      </div>
    </main>
  );
}
