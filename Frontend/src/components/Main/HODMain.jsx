import React from "react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHodData } from "../../Features/HodSlice";
import NoDP from "../../assets/blankProfile.png";

function Main() {
  document.title = "HOD Message";
  const dispatch = useDispatch();
  const { HodInfo, loading, error } = useSelector((state) => state.HodData);

  useEffect(() => {
    dispatch(fetchHodData());
  }, [dispatch]);

  const value = useMemo(() => HodInfo, [HodInfo]);

  console.log("HOD MAIN DeBUG", HodInfo);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <main className="flex-1 lg:ml-10 p-0 m-1 lg:p-6">
          <div className=" mx-auto pt-4 space-y-8  bg-white">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center  lg:mt-0">
              {/* Left side with image */}
              <div className="w-64 h-64 relative">
                <div
                  className="absolute inset-0 bg-white rounded-lg shadow-lg overflow-hidden"
                  style={{
                    transform: "perspective(1000px) rotateY(0deg)",
                  }}
                >
                  <img
                    src={value.image === "" ? NoDP : value.image}
                    alt="Department Head"
                    className="w-full h-full object-fit "
                  />
                </div>
              </div>

              {/* Right side with info */}
              <div className="flex-grow">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {value.name}
                </h1>
                <h2 className="text-xl text-gray-700 mb-6">
                  Head of Department
                </h2>

                {/* Green line separator */}
                <div className="h-1 w-full bg-emerald-600 mb-6"></div>

                {/* Contact details */}
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <span className="text-gray-600 w-20">Email</span>
                    <span className="text-gray-800">:</span>
                    <a
                      href={`mailto:${value.officeMail}`}
                      className="text-gray-800 hover:text-emerald-600"
                    >
                      {value.officeMail}
                    </a>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-600 w-20">Tel No.</span>
                    <span className="text-gray-800">:</span>
                    <span className="text-gray-800">
                      {value.phoneNumber} (O){" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* HoD's Message Section */}
            <div className="mt-12">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  HoD's Message
                </h2>
                {/* Green line separator */}
                <div className="h-1 w-32 bg-emerald-600  mt-2"></div>
              </div>

              <div className="bg-white shadow-md rounded-lg border-l-4 border-teal-600">
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {value.HodMessage || "No message available."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Main;
