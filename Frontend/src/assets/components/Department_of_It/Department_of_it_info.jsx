import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainDepartmentData  } from "../../../Features/MainDepartmentSlice";

function DepartmentOfItInfo() {
  const dispatch = useDispatch();
  const { MainDepartmentInfo, loading, error } = useSelector((state) => state.MainDepartmentData);

  useEffect(() => {
    dispatch(fetchMainDepartmentData());


  }, [dispatch]);

  const value = useMemo(() => MainDepartmentInfo, [MainDepartmentInfo]);

 

  console.log('MainINFODATA',MainDepartmentInfo);

  if (loading) {

    
    return (
      <>
      <div className="card bg-base-100 w-full sm:w-auto  shadow-xl">
 
 <div className="flex w-52 flex-col gap-4">
 <div className="skeleton h-32 w-full"></div>
 <div className="skeleton h-4 w-28"></div>
 <div className="skeleton h-4 w-full"></div>
 <div className="skeleton h-4 w-full"></div>
 </div>
   
    </div>

      
      
      </>
    )
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>{error}</span>
</div>

    );
  }

  return (


    <>

<div className="card  bg-base-100 w-full sm:w-auto  shadow-xl">
  <figure>
    <img
      src={value.image || "https://via.placeholder.com/400"} 
      alt="Department of IT" />
  </figure>
  <div className="card-body">
    <h2 className="lg:text-2xl sm:text-xl text-2xl font-semibold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{value.name || "Department of IT"}</h2>
    <div className="scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100 no-bar">
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg mt-6 max-h-72 sm:max-h-96 overflow-y-auto">
              {value.description || "Description not found"
             }
            </p>
          </div>
    
    <div className="card-actions justify-end">
      
    </div>
  </div>
</div>
    
   
    </>
  );
}

export default React.memo(DepartmentOfItInfo);
