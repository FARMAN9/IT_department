import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainDepartmentData } from "../../Features/MainDepartmentSlice";
import Errors from "../UtilityCompoments/Errors";
import Loading from "../UtilityCompoments/Loading";

function DepartmentOfItInfo() {
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
    return <Loading />;
  }

  if (error) {
    return <Errors error={error.error} />;
  }

  return (
    <>
      <div className="card  bg-base-100 w-full sm:w-auto  shadow-xl">
        <figure>
          <img
            src={value.image || "https://via.placeholder.com/400"}
            alt="Department of IT"
          />
        </figure>
        <div className="card-body">
          <h2 className="lg:text-2xl sm:text-xl text-2xl font-semibold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {value.name || "Department of IT"}
          </h2>
          <div className="scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100 no-bar">
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg mt-6 max-h-72 sm:max-h-96 overflow-y-auto">
              {value.description || "Description not found"}
            </p>
          </div>

          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </>
  );
}

export default React.memo(DepartmentOfItInfo);
