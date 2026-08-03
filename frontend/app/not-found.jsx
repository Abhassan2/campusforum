"use client"
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter()

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full text-center p-10 shadow-lg shadow-gray-400">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] mb-4">
          Page Not Found
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-4">404</h1>
        <p className="text-base sm:text-lg text-slate-600 mb-8">
          Oops! The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href=""
          className="inline-flex items-center justify-center gap-2 text-sm hover:underline"
          onClick={()=> router.back()}
        >
          <AiOutlineArrowLeft className="text-xl" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
