import React from "react";

const NotFound: React.FC = () => {
  return (
    <div
      className={
        "flex min-h-screen h-screen justify-center items-center bg-slate-900 text-white"
      }>
      <h1 className={"text-4xl font-semibold"}>404 Page Not Found</h1>
    </div>
  );
};

export default NotFound;
