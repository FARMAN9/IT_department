import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchMainDepartmentData } from "../../Features/MainDepartmentSlice";
import MainCard from "../Activites/MainCard";
import Loading from "../UtilityCompoments/Loading";
import Errors from "../UtilityCompoments/Errors";

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
    return <Loading />;
  }

  if (error) {
    return <Errors error={error.error || "Something went wrong"} />;
  }

  return (
    <>
      <MainCard title="Contact Us">
        {/* Content */}
        <div className=" flex justify-center items-center p-4 max-w-full ">
          <div className=" p-4 w-full  ">
            <div className="mb-4">
              <div className="mt-2 bg-gray-100 p-4 border border-gray-300 rounded ">
                <p className="font-semibold">Address</p>
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
      </MainCard>
    </>
  );
}

export default React.memo(Main);
