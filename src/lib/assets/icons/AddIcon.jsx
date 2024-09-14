import React from "react";

const AddIcon = ({width, height, color}) => {
  return (
    <svg
      width={width ? width : "36px"}
      height={height ? height : "36px"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12H20M12 4V20"
        stroke={color ? color : "#000000"}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default AddIcon;
