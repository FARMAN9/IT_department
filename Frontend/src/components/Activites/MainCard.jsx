import React from "react";

function MainCard({ title, children }) {
  return (
    <div className="min-h-auto flex lg:mr-0 mt-[-20%] md:mt-[-10%] lg:mt-0 xl:mt-0 2xl:mt-0   ">
      <main className="flex-1">{/*here*/ }
        <div className=" mx-auto pt-0 space-y-3 rounded  lg:p-1  md:p-3 p-1">
          <div className="mb-2">
            <div className="mt-20 text-sm lg:text-lg md:text-md  lg:mt-0 xl:mt-0 inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6  py-2 rounded-full  font-bold shadow-lg shadow-blue-900 ">
              {title}
            </div>
          </div>
          <div className="bg-white shadow-[15px_15px_30px_#bebebe,-15px_-15px_30px_#ffffff] rounded-lg  min-h-screen lg:p-2 ">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default React.memo(MainCard);
