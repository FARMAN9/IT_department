import React, { useMemo } from "react";
import AcademicSidebar from "../Sidebar/Sidebar";

// TableRow component will be memoized to prevent unnecessary re-renders.
const TableRow = React.memo(({ batch, sem, download }) => (
  <tr className="border-b even:bg-gray-50">
    <td className="px-4 py-3">{batch}</td>
    <td className="px-4 py-3">{sem}</td>
    <td className="px-4 py-3">
      <a
        href={download}
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal-600 hover:underline"
        aria-label={`Download timetable for ${sem}, batch ${batch}`}
      >
        Download
      </a>
    </td>
  </tr>
));

function Main() {
  const data = useMemo(() => [
    {
      sem: "1st Semester",
      batch: "2022",
      download:
        "https://drive.google.com/file/d/1Y5d5YR2lQ5J7yBwM6D7X9Q6WbNk5L6oE/view?usp=share_link",
    },
    {
      sem: "2nd Semester",
      batch: "2022",
      download:
        "https://drive.google.com/file/d/1Y5d5YR2lQ5J7yBwM6D7X9Q6WbNk5L6oE/view?usp=share_link",
    },
    {
      sem: "3rd Semester",
      batch: "2022",
      download:
        "https://drive.google.com/file/d/1Y5d5YR2lQ5J7yBwM6D7X9Q6WbNk5L6oE/view?usp=share_link",
    },
    {
      sem: "4th Semester",
      batch: "2022",
      download:
        "https://drive.google.com/file/d/1Y5d5YR2lQ5J7yBwM6D7X9Q6WbNk5L6oE/view?usp=share_link",
    },
    {
      sem: "5th Semester",
      batch: "2022",
      download:
        "https://drive.google.com/file/d/1Y5d5YR2lQ5J7yBwM6D7X9Q6WbNk5L6oE/view?usp=share_link",
    },
    {
      sem: "6th Semester",
      batch: "2022",
      download:
        "https://drive.google.com/file/d/1Y5d5YR2lQ5J7yBwM6D7X9Q6WbNk5L6oE/view?usp=share_link",
    },
  ], []); // Using empty dependency array to memoize data

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="flex-1 lg:ml-10 p-4 space-y-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <header className="mt-24 lg:mt-0">
            <h1 className="inline-block bg-teal-600 text-white px-5 py-2 rounded-full text-xl font-bold shadow-lg">
              Timetable
            </h1>
          </header>

          {/* Table Section */}
          <section className="mt-6 bg-white rounded-lg shadow-md p-4 border-l-4 border-teal-600">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-4 py-3 font-medium">Batch</th>
                    <th className="px-4 py-3 font-medium">Semester</th>
                    <th className="px-4 py-3 font-medium">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <TableRow
                      key={index}
                      batch={row.batch}
                      sem={row.sem}
                      download={row.download}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Main;

