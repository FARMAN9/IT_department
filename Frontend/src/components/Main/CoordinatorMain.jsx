import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcademicCoordinatorsData } from "../../Features/AcademicCoordinatorSlice";
import {
  HiChevronLeft,
  HiChevronRight,
  HiSearch,
  HiPencil,
  HiTrash,
} from "react-icons/hi";

import axios from "axios";
import toast from "react-hot-toast";
import MainCard from "../Activites/MainCard";
import Loading from "../UtilityCompoments/Loading";
import Errors from "../UtilityCompoments/Errors";

function AcademicCord() {
  const dispatch = useDispatch();
  const { AcademicCoordinator, loading, error } = useSelector(
    (state) => state.AcademicCoordinatorData
  );

  // State Management
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchAcademicCoordinatorsData());
  }, [dispatch]);

  // Error handling
  const handleApiError = (err, action) => {
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      `${action} failed. Please try again.`;
    toast.error(errorMessage);
  };

  // Search and Pagination
  const filteredAcademicCoordinator = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return AcademicCoordinator.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, AcademicCoordinator]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(
    filteredAcademicCoordinator.length / rowsPerPage
  );
  const currentRows = filteredAcademicCoordinator.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  // Mobile Card Component
  const MobileCard = ({ item }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal-600 mb-3">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800">{item.Programe}</h3>
        </div>
        <span className="text-sm text-teal-800 flex-wrap rounded">
          Batch : {item.Batch} <br />
          Semester : {item.Semester}
          <br />
          Session : {item.Session} <br />
          Coordinator : {item.Coordinators}
          <br />
          Name : {item.Name}
        </span>
        <div className="mt-2 flex justify-between items-center"></div>
      </div>
    </div>
  );

  if (loading)
    return (
      <MainCard title="Academic Coordinators">
        <Loading />
      </MainCard>
    );
  if (error)
    return (
      <MainCard title="Academic Coordinators">
        <Errors error={error} />
      </MainCard>
    );

  return (
    <>
      {/* Edit Modal */}

      <MainCard title="Academic Coordinators">
        <div className="min-h-auto flex m-0">
          <main className="flex-1">
            <div className="mx-auto">
              <div className="space-y-4 p-4">
                {/* Controls Section */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="w-full sm:w-64 relative">
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Search academic coordinator..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <HiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <label
                        htmlFor="rows-per-page"
                        className="mr-2 text-sm text-gray-600"
                      >
                        Rows:
                      </label>
                      <select
                        id="rows-per-page"
                        className="border rounded-lg px-3 py-1 focus:ring-2 focus:ring-teal-500"
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
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto rounded-lg border">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">

                      <tr>


                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Programme
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Batch
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Semester
                        </th>

                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Session
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Coordinator
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Name
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentRows.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900">
                            {item.Programe}
                          </td>
                          <td className="py-3 px-4 text-gray-900">
                            {item.Batch}
                          </td>

                          <td className="py-3 px-4 text-gray-900">
                            {item.Semester}
                          </td>
                          <td className="py-3 px-4 text-gray-900">
                            {item.Session}
                          </td>
                          <td className="py-3 px-4 text-gray-900">
                            {item.Coordinators}
                          </td>
                          <td className="py-3 px-4 text-gray-900">
                            {item.Name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                  {currentRows.map((item, index) => (
                    <MobileCard key={index} item={item} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstRow + 1} to{" "}
                    {Math.min(
                      indexOfLastRow,
                      filteredAcademicCoordinator.length
                    )}{" "}
                    of {filteredAcademicCoordinator.length} entries
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                    >
                      <HiChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-md ${
                              page === currentPage
                                ? "bg-teal-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
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
                      <HiChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </MainCard>
    </>
  );
}

export default AcademicCord;
