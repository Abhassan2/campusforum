"use client";
import { useState } from "react";
import F from '@/components/f.jsx';

export default function UsernamePage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your login API logic here
    console.log("Login submitted");
  };

  return (
    <F />
  );
}
