import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTimeTableData } from "../../Features/TimeTabelSlice";
import MainCard from "../Activites/MainCard";
import Loading from "../UtilityCompoments/Loading";
import Errors from "../UtilityCompoments/Errors";

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

  if (loading) {
    return (
      <MainCard title="Time Table">
        <Loading />
      </MainCard>
    );
  }

  if (error) {
    return (
      <MainCard title="Time Table">
        <Errors error={error.error || "Something went wrong" || error} />
      </MainCard>
    );
  }

  return (
    <MainCard title="Time Table">
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
                className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}
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
    </MainCard>
  );
}

export default Main;
