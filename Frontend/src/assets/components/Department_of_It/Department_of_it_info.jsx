import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainDepartmentData  } from "../../../Features/MainDepartmentSlice";

function DepartmentOfItInfo() {
  const dispatch = useDispatch();
  const { MainDepartmentInfo, loading, error } = useSelector((state) => state.MainDepartmentData);

  useEffect(() => {
    dispatch(fetchMainDepartmentData());

  }, [dispatch]);
  const info = useMemo(() => MainDepartmentInfo, [MainDepartmentInfo]);
 

  console.log('MainINFODATA',info);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=" w-full sm:w-auto pt-3 h-full bg-white rounded-lg shadow-md">
      {/* Card Image */}
      <img
        src={info.image}
        alt="Department of IT"
        className="w-full h-64 sm:h-96 rounded-lg object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        <h2 className="lg:text-2xl sm:text-xl text-2xl font-semibold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          INFORMATION TECHNOLOGY
        </h2>

        {/* Scrollable Content Section */}

        <div className="max-h-[400px] overflow-y-auto no-bar pr-4">
          {/* Added custom scrollbar styling */}
          <div className="scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100 no-bar">
            <div className="text-gray-700 text-sm sm:text-base lg:text-lg mt-6 max-h-72 sm:max-h-96 overflow-y-auto">
              {
                info.description
             }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DepartmentOfItInfo);
