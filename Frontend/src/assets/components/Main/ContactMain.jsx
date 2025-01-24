import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchMainDepartmentData } from "../../../Features/MainDepartmentSlice";
function Main() {
  document.title = "Contact";

  const dispatch = useDispatch();
  const { MainDepartmentInfo, loading, error } = useSelector(
    (state) => state.MainDepartmentData
  );

  useEffect(() => {
    dispatch(fetchMainDepartmentData());
  }, [dispatch]);

  const value = useMemo(() => MainDepartmentInfo, [MainDepartmentInfo]);



  console.log("MainINFODATA", MainDepartmentInfo);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="min-h-screen flex lg:mr-10">
        <main className="flex-1 lg:ml-10 p-2 lg:p-6">
          <div className=" mx-auto pt-4 space-y-0  bg-white">
            {/* Header */}
            <div className="mb-10">
              <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-6  py-2 rounded-full text-xl font-bold shadow-lg">
                Contact Us
              </div>
            </div>
            {/* Content */}
            <div className=" flex justify-center items-center p-4 max-w-full ">
              <div className="bg-white shadow-md rounded-lg p-8 w-full border-l-4 border-teal-600 ">
                <div className="mb-4">
                  <h2 className="text-lg font-bold ">Address</h2>
                  <div className="mt-2 bg-gray-100 p-4 border border-gray-300 rounded ">
                    <p>
                      Department of Information Technology
                      <br />
                      National Institute of Technology
                      <br />
                      {value.city},
                      <br />
                      {value.state},{value.pinCode}
                    </p>
                  </div>
                </div>
                <div className="flex-col lg:flex  xl:flex 2xl:flex justify-between  gap-2 ">
                  <div className="mb-4 bg-gray-100 p-4 border border-gray-300 rounded ">
                    <p className="font-semibold">Office Email</p>
                    <a
                      href={`mailto:${value.OfficeMail}`}
                      className="text-blue-500 underline hover:text-blue-700 "
                    >
                      {value.officeMail}
                    </a>
                  </div>
                  <div className="mb-4 bg-gray-100 p-4 border border-gray-300 rounded ">
                    <p className="font-semibold">Phone</p>
                    <a
                      href={`tel:${value.phoneNumber}`}
                      className="text-blue-500 underline hover:text-blue-700 "
                    >
                      {value.phoneNumber}
                    </a>
                    <br />
                    
                  </div>
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
