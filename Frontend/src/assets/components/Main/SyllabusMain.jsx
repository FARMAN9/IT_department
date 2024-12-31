import React, { useMemo } from "react";
import AcademicSidebar from "../Sidebar/Sidebar";

function Main() {
  // Memoize static data to avoid re-creating it on each render
  const data = useMemo(
    () => [
      {
        batch: "2021",
        coordinator: "Dr. Kusum K. Bharti",
        download:
          "https://drive.google.com/file/d/1Y5d5YR2lQ5J7yBwM6D7X9Q6WbNk5L6oE/view?usp=share_link",
      },
      {
        batch: "2022",
        coordinator: "Dr. Mohit Kumar",
        download:
          "https://drive.google.com/file/d/1Y5d5YR2lQ5J7yBwM6D7X9Q6WbNk5L6oE/view?usp=share_link",
      },
      {
        batch: "2023",
        coordinator: "Dr. Nisha Chaurasia",
        download:
          "https://drive.google.com/file/d/1Y5d5YR2lQ5J7yBwM6D7X9Q6WbNk5L6oE/view?usp=share_link",
      },
    ],
    []
  );

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
    <div className="min-h-screen flex flex-col lg:flex-row lg:mr-10 bg-gray-100">
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="flex-1 lg:ml-10 p-4 space-y-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="relative">
            <h1 className="mt-24 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-5 py-2 rounded-full text-xl font-bold shadow-lg">
              Syllabus
            </h1>
          </div>

          {/* Table Section */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-4 border-l-4 border-teal-600">
            <div className="overflow-x-auto">
              <table role="table" className="w-full text-left border-collapse">
                <thead>
                  <tr role="row" className="bg-gray-100 text-gray-700">
                    <th className="px-4 py-3 font-medium">Batch</th>
                    <th className="px-4 py-3 font-medium">Coordinator</th>
                    <th className="px-4 py-3 font-medium">Download</th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  {data.map((row, index) => (
                    <tr
                      key={index}
                      role="row"
                      className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                    >
                      <td className="px-4 py-3">{row.batch}</td>
                      <td className="px-4 py-3">{row.coordinator}</td>
                      <td className="px-4 py-3">
                        {renderDownloadLink(row.download, row.batch)}
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
