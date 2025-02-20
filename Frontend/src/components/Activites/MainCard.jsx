import React from "react";

function MainCard({ title, children }) {
  return (
    <div className="min-h-auto flex lg:mr-0 mt-[-20%] md:mt-[-10%] lg:mt-0 xl:mt-0 2xl:mt-0   ">
      <main className="flex-1 lg:ml-0 p-0 ">{/*here*/ }
        <div className=" mx-auto pt-6 space-y-3 rounded  lg:p-5 md:p-3 p-1">
          <div className="mb-2">
            <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-6  py-2 rounded-full text-xl font-bold shadow-lg">
              {title}
            </div>
          </div>
          <div className="mt-0 bg-white rounded-lg shadow-md p-3 border-l-4 border-teal-600">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default React.memo(MainCard);
