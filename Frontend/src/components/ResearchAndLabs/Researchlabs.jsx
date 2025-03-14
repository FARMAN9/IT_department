
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResearchLabsData } from "../../Features/ResearchLabsSlice";
import { HiChevronLeft, HiChevronRight, HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";

import MainCard from "../Activites/MainCard";
import LabCard from "../Activites/LabCard";
import Loading from "../UtilityCompoments/Loading";
import Errors from "../UtilityCompoments/Errors";

function Researchlabs() {
  const dispatch = useDispatch();
  const { researchLabs, loading, error } = useSelector(
    (state) => state.ResearchLabsData
  );

  useEffect(() => {
    dispatch(fetchResearchLabsData());
  }, [dispatch]);

  // State Management
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Search and Pagination
  const filteredLabs = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return researchLabs.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, researchLabs]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(filteredLabs.length / rowsPerPage);
  const currentRows = filteredLabs.slice(indexOfFirstRow, indexOfLastRow);

  // Mobile Card Component

  if (loading)
    return (
      <MainCard title="Research Labs">
        <Loading />
      </MainCard>
    );
  if (error)
    return (
      <MainCard title="Research Labs">
        <Errors error={error} />
      </MainCard>
    );

  return (
    <>
      <MainCard title="Research Labs">
        <div className="min-h-auto flex m-0">
          <main className="flex-1">
            <div className="mx-auto">
              <div className="space-y-4 p-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="w-full sm:w-64 relative">
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      placeholder="Search ..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <HiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <select
                        className="border rounded-lg px-3 py-1"
                        value={rowsPerPage}
                        onChange={(e) => {
                          setRowsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                      >
                        {[8, 16, 24, 32, 50, 100].map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Desktop Table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                  {currentRows.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <Link
                      to={`/labs/lab-details/${encodeURIComponent(
                        JSON.stringify(item)
                      )}`}
                      replace
                      state={{
                        name: item.name,
                        description: item.description,
                        location: item.location,
                        lab_manual: item.lab_manual,
                        updatedAt: item.updatedAt,
                        image: item.image,
                        Incharge: item.Incharge,
                        _id: item._id,
                      }}
                    >
                      <LabCard key={item._id} item={item} />
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstRow + 1} to{" "}
                    {Math.min(indexOfLastRow, filteredLabs.length)} of{" "}
                    {filteredLabs.length} entries
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

export default Researchlabs;
