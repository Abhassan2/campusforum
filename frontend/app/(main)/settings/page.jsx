"use client";

import { useContext } from "react";
import { TbLogout } from "react-icons/tb";
import { AuthContext } from "../../context/authContext.jsx";

export default function SettingsPage() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <div className="min-h-screen px-6 py-8 bg-slate-50 text-slate-900">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">Settings</h1>
        <p className="text-sm text-slate-600 mb-6">
          Manage your account preferences and sign out when you are finished.
        </p>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <TbLogout className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
}
