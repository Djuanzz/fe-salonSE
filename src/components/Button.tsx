import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({
  children,
  className = "bg-blue-600 text-white",
  ...rest
}) => {
  return (
    <button {...rest} className={` px-2 py-1 rounded ${className}`}>
      {children}
    </button>
  );
};

export default Button;
