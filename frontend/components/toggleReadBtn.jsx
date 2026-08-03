import React from "react";

function ToggleReadBtn({textLength, onToggle, isExpanded, }) {

  if (textLength < 60) return null;

  return (
    <span
      onClick={onToggle}
      className="text-gray-700 font-bold cursor-pointer"
    >
      {isExpanded ? "Read less" : "...Read more"}
    </span>
  );
}

export default React.memo(ToggleReadBtn)