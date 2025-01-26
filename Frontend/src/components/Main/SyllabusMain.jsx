import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSyllabusData } from "../../Features/SyllabusSlice";
import MainCard from "../Activites/MainCard";
import Loading from "../UtilityCompoments/Loading";
import Errors from "../UtilityCompoments/Errors";

function Main() {
  document.title = "Syllabus";

  // Memoize static data to avoid re-creating it on each render

  const { syllabus, loading, error } = useSelector(
    (state) => state.SyllabusData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSyllabusData());
  }, [dispatch]);

  const value = useMemo(() => syllabus, [syllabus]);

  console.log("syllabus", syllabus);

  // Memoize the link rendering to avoid creating a new function on every render
  const renderDownloadLink = (downloadUrl, batch) => (
    <a
      href={downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-teal-600 hover:underline"
      aria-label={`Download syllabus for ${batch} batch`}
    >
      Download
    </a>
  );

  if (loading) {
    return (
      <MainCard title="Syllabus">
        <Loading />
      </MainCard>
    );
  }

  if (error) {
    return (
      <MainCard title="Syllabus">
        <Errors error={error.error || "Something went wrong" || error} />
      </MainCard>
    );
  }

  return (
    <MainCard title="Syllabus">
      <div className="overflow-x-auto">
        <>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">
                    Programme
                  </th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">
                    Batch
                  </th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">
                    Coordinator
                  </th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody>
                {value.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : ""
                    } sm:table-row flex flex-col sm:flex-row`}
                  >
                    <td
                      className="px-4 py-3 sm:table-cell block"
                      data-label="Programme"
                    >
                      <span className="sm:hidden font-bold mr-2">
                        Programme:
                      </span>
                      {row.Programe}
                    </td>
                    <td
                      className="px-4 py-3 sm:table-cell block"
                      data-label="Batch"
                    >
                      <span className="sm:hidden font-bold mr-2">Batch:</span>
                      {row.Batch}
                    </td>
                    <td
                      className="px-4 py-3 sm:table-cell block"
                      data-label="Coordinator"
                    >
                      <span className="sm:hidden font-bold mr-2">
                        Coordinator:
                      </span>
                      {row.Coordinators}
                    </td>
                    <td
                      className="px-4 py-3 sm:table-cell block"
                      data-label="Download"
                    >
                      <span className="sm:hidden font-bold mr-2">
                        Download:
                      </span>
                      {renderDownloadLink(row.Syllabus, row.Batch)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      </div>
    </MainCard>
  );
}

export default Main;
