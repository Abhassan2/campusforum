import React from "react";
import Link from "next/link";

 function LinkButton({ href = "", text, onClick }) {
  return (
    <Link
      href={href}
      className="max-w-45 px-10 py-1 border rounded bg-gray-50 hover:bg-gray-200 cursor-pointer"
      onClick={onClick}
    >
      {text}
    </Link>
  );
}

export default React.memo(LinkButton);
