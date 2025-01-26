import React, { memo } from "react";
import { Ban } from "lucide-react";

function Errors({ error }) {
  return (
    <div className="flex items-center justify-center w-full min-h-full border  rounded-lg p-6">
      <div className="card flex w-full flex-col gap-2 bg-base-100 shadow-lg">
        <div role="alert" className="alert alert-error flex items-center p-4">
          <Ban className="mr-2 text-white animate-spin size-6" />
          <span className=" text-white lg:text-sm sm:text-base md:text-base font-semibold">
            {error || "Something went wrong Please reload ..."}
          </span>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="btn bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md m-4 hover:cursor-pointer"
        >
          Reload
        </button>
      </div>
    </div>
  );
}

export default memo(Errors);
