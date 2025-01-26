import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcademicCoordinatorsData } from "../../Features/AcademicCoordinatorSlice";
import MainCard from "../Activites/MainCard";
import Loading from "../UtilityCompoments/Loading";
import Errors from "../UtilityCompoments/Errors";

function Main() {
  document.title = "Coordinator";
  const dispatch = useDispatch();
  const { AcademicCoordinator, loading, error } = useSelector(
    (state) => state.AcademicCoordinatorData
  );

  useEffect(() => {
    dispatch(fetchAcademicCoordinatorsData());
  }, [dispatch]);

  const data = useMemo(() => AcademicCoordinator, [AcademicCoordinator]);

  console.log("AcademicCoordinator", AcademicCoordinator);

  if (loading) {
    return (
      <MainCard title="Coordinator">
        <Loading />
      </MainCard>
    );
  }

  if (error) {
    return (
      <MainCard title="Coordinator">
        <Errors error={error.error || "Something went wrong"} />
      </MainCard>
    );
  }

  return (
    <MainCard title="Coordinator">
      <div className="bg-white shadow-md rounded-lg">
        <table className="w-full table-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 text-left font-medium">PROGRAMME</th>
              <th className="px-4 py-3 text-left font-medium">COORDINATOR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}
              >
                <td className="px-4 py-3">{row.Programe}</td>
                <td className="px-4 py-3">{row.Coordinators}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainCard>
  );
}

export default Main;
