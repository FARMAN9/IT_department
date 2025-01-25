import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSyllabusData } from "../../../Features/SyllabusSlice";

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

  return (
    <div className="min-h-screen flex flex-col lg:flex-row lg:mr-10">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 lg:ml-10 p-4 space-y-8">
        <div className=" mx-auto pt-4 space-y-8">
          {/* Header Section */}
          <div className="relative">
            <h1 className="mt-24 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-5 py-2 rounded-full text-xl font-bold shadow-lg">
              Syllabus
            </h1>
          </div>

          {/* Table Section */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-4 border-l-4 border-teal-600">
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
                            <span className="sm:hidden font-bold mr-2">
                              Batch:
                            </span>
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
