import React, { useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHodData } from "../../Features/HodSlice";
import Loading from "../UtilityCompoments/Loading";
import Errors from "../UtilityCompoments/Errors";
import NoDP from "../../assets/blankProfile.png";

const HodCard = () => {
  const dispatch = useDispatch();
  const { HodInfo, loading, error } = useSelector((state) => state.HodData);

  useEffect(() => {
    dispatch(fetchHodData());
  }, [dispatch]);

  const value = useMemo(() => HodInfo, [HodInfo]);

  console.log("HOD MAIN DeBUG", HodInfo);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Errors error={error.error} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-2 border">
      <div className="flex items-center mb-4">
        <div className="w-40 h-40 mr-4 rounded-full bg-blue-300">
          <img
            src={value.image === "" ? NoDP : value.image}
            alt={value.name}
            className="w-full h-full rounded-full object-cover border-2 border-blue-300 border-dashed animation-border"
          />
        </div>
        <h2 className="text-xl font-bold">
          {value.name}
          <p className="text-sm  text-blue-950  font-bold">
            Head of Department
          </p>
        </h2>
      </div>
      <div className="m-2 items-center grid">
        <p className="font-sans  text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-justify">
          {value.HodMessage || " HodMessage is not available"}
        </p>
        <div className="self-start mt-4">
          <NavLink to="/about/hod-message">
            <button className="btn btn-active lg:text-lg md:text-base text-white btn-info">
              View Message
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HodCard;
