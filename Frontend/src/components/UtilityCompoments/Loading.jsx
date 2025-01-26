import React from "react";

function Loading() {
  return (
    <div className="card bg-base-100 w-auto h-auto shadow-xl  flex items-center justify-center border ">
      <div className="flex w-68  flex-col gap-2">
        <div className="skeleton h-32 w-full bg-blue-300"></div>
        <div className="skeleton h-4 w-28  bg-blue-300"></div>
        <div className="skeleton h-4 w-full  bg-blue-300"></div>
        <div className="skeleton h-4 w-full  bg-blue-300"></div>
      </div>
    </div>
  );
}

export default Loading;
