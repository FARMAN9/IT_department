import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const PublicationsTable = ({ title }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const publications = [
    {
      name: "Security and Privacy, Wiley",
      authorsTitle:
        'Ravi Kumar, Samayveer Singh, Deepti Singh, Mohit Kumar, Sukhpal Singh Gill "A robust and secure user authentication scheme based on multifactor and multi-gateway in IoT enabled sensor networks"',
      year: 2024,
      link: "#",
    },
    {
      name: "Multimedia Tools and Applications, SCI [IF=3.6]",
      authorsTitle:
        'Mohit Kumar, Atul Rai, Surbhit, Neeraj Kumar "Autonomic edge cloud-assisted framework for heart disease prediction using RF-LRG algorithm"',
      year: 2024,
      link: "#",
    },
    {
      name: "IEEE Transactions on Sustainable Computing, 2024, (IEEE IF = 2.456)",
      authorsTitle:
        'Mohit Kumar, Avadh Kishor, P K Singh and Kalka Dubey "Deadline-aware Cost and Energy Efficient Offloading in Mobile Edge Computing"',
      year: 2024,
      link: "#",
    },
    {
      name: "Computers in Human Behavior, Elsevier (SCI IF=9.0)",
      authorsTitle:
        'Mansi Gupta, Mohit Kumar and Yash Gupta, "A Blockchain-Empowered Federated Learning-based Framework for Data Privacy in Lung Disease Detection System"',
      year: 2024,
      link: "#",
    },
    {
      name: "IEEE Transaction of Consumer Electronics (IEEE IF=4.3)",
      authorsTitle:
        'Prabal Verma, Mohit Kumar, S S Gill and Wu Huaming, "Data Driven Stochastic Game Network-based Smart Home Monitoring System using IoT-enabled Edge Computing Environments"',
      year: 2024,
      link: "#",
    },
    {
      name: "IEEE Transaction of Consumer Electronics (IEEE IF=4.3)",
      authorsTitle:
        'Prabal Verma, Mohit Kumar, S S Gill and Wu Huaming, "Data Driven Stochastic Game Network-based Smart Home Monitoring System using IoT-enabled Edge Computing Environments"',
      year: 2024,
      link: "#",
    },
  ];

  // Enhanced search to look through both name and authors/title
  const filteredPublications = publications.filter((pub) =>
    Object.values(pub).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPublications.slice(
    indexOfFirstRow,
    indexOfLastRow
  );
  const totalPages = Math.ceil(filteredPublications.length / rowsPerPage);

  // Mobile card component
  const MobileCard = ({ pub }) => (
    <div className="bg-white p-4 rounded shadow-sm border-l-4 border-teal-600">
      <div className="space-y-3">
        <div className="font-medium text-gray-800">{pub.name}</div>
        <div className="text-gray-600 text-sm">{pub.authorsTitle}</div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Year: {pub.year}</span>
          <a
            href={pub.link}
            className="text-blue-500 hover:text-blue-700 transition-duration-300"
          >
            View Publication
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-auto flex m-0 pt-3">
      <main className="flex-1 ">
        <div className="mx-auto ">
          <div className="relative">
            <div className="mt-0 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-5 py-2 rounded-full text-xl font-bold shadow-lg">
              {title}
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-md">
              <div className="space-y-4">
                {/* Controls Section */}
                <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                  <div className="w-full sm:w-64 relative">
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Search publications..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>

                  <div className="flex items-center">
                    <label
                      htmlFor="rows-per-page"
                      className="mr-2 text-sm text-gray-600"
                    >
                      Rows per page:
                    </label>
                    <select
                      id="rows-per-page"
                      className=" border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={rowsPerPage}
                      onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      {[5, 10, 25, 50].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Journal/Conference
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Authors & Title
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Year
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Link
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentRows.map((pub, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4 text-sm text-gray-900">
                            {pub.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-900">
                            {pub.authorsTitle}
                          </td>
                          <td className="py-3 px-4 text-center text-sm text-gray-900">
                            {pub.year}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <a
                              href={pub.link}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {currentRows.map((pub, index) => (
                    <MobileCard key={index} pub={pub} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstRow + 1} to{" "}
                    {Math.min(indexOfLastRow, filteredPublications.length)} of{" "}
                    {filteredPublications.length} entries
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-md transition-colors ${
                              page === currentPage
                                ? "bg-teal-600 text-white"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicationsTable;
