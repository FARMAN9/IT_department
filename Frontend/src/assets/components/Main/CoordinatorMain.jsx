import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcademicCoordinatorsData } from "../../../Features/AcademicCoordinatorSlice";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-auto flex lg:mr-10">
      <main className="flex-1 lg:ml-10 p-2 lg:p-4">
        <div className="mx-auto pt-4 space-y-0  ">
          {/* Coordinator Section */}
          <div className="relative">
            <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-5 py-2 rounded-full text-xl font-bold shadow-lg">
              Coordinator
            </div>
            <div className="mt-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-600">
              <div className="bg-white shadow-md rounded-lg">
                <table className="w-full table-full">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="px-4 py-3 text-left font-medium">
                        PROGRAMME
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        COORDINATOR
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-gray-50" : ""
                        }`}
                      >
                        <td className="px-4 py-3">{row.Programe}</td>
                        <td className="px-4 py-3">{row.Coordinators}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
