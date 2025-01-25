import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTimeTableData } from "../../../Features/TimeTabelSlice";
// TableRow component will be memoized to prevent unnecessary re-renders.

function Main() {
  document.title = "Time Table";

  // Memoize static data to avoid re-creating it on each render

  const { TimeTable, loading, error } = useSelector(
    (state) => state.TimeTableData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTimeTableData());
  }, [dispatch]);

  const value = useMemo(() => TimeTable, [TimeTable]);

  console.log("syllabus", TimeTable);

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
              Time Table
            </h1>
          </div>

          {/* Table Section */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-4 border-l-4 border-teal-600">
            <div className="overflow-x-auto">
              <table role="table" className="w-full text-left border-collapse">
                <thead>
                  <tr role="row" className="bg-gray-100 text-gray-700">
                    <th className="px-4 py-3 font-medium">Programme</th>
                    <th className="px-4 py-3 font-medium">Batch</th>
                    <th className="px-4 py-3 font-medium">Download</th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  {value.map((row, index) => (
                    <tr
                      key={index}
                      role="row"
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-50" : ""
                      }`}
                    >
                      <td className="px-4 py-3">{row.Programe}</td>
                      <td className="px-4 py-3">{row.Batch}</td>

                      <td className="px-4 py-3">
                        {renderDownloadLink(row.TimeTable, row.Batch)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
