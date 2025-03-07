import React, { useEffect, useMemo, useState } from "react";
import MainCard from "../Activites/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FacultyCard from "../Facultycard/FaclutyCard"; // Ensure the file name/path is correct
import { fetchCurrentTopPlacementsData } from "../../Features/TopplacementSlice";
import {
  HiChevronLeft,
  HiChevronRight,
  HiSearch,
  HiPhoneMissedCall,
  HiPhone,
} from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { FaResearchgate } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";

import NoDP from "../../assets/blankProfile.png";

function TopPlacementCard() {
  // Set the document title when the component mounts
  useEffect(() => {
    document.title = "Top Placements";
  }, []);

  const dispatch = useDispatch();
  const { CurrentTopPlacements, loading, error } = useSelector(
    (state) => state.CurrentTopPlacementsData
  );

  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCurrentTopPlacementsData());
  }, [dispatch]);

  // Memoize filtering for performance
  const filteredStudents = useMemo(() => {
    return CurrentTopPlacements.filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [CurrentTopPlacements, search]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredStudents.length / rowsPerPage);
  }, [filteredStudents, rowsPerPage]);

  const indexOfFirstRow = (currentPage - 1) * rowsPerPage;
  const indexOfLastRow = indexOfFirstRow + rowsPerPage;
  const currentRows = filteredStudents.slice(indexOfFirstRow, indexOfLastRow);

  // Handle loading or error states
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <MainCard title="Top Placements">
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
                    placeholder="Search scholars..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1); // Reset to first page on search
                    }}
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
                      {[8, 16, 32, 64, 100].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Scholars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                {currentRows.map((faculty, index) => (
                  <div key={faculty.id || index} className="flex flex-wrap">
                    <FacultyCard
                      image={faculty.image === "" ? NoDP : faculty.image}
                      name={faculty.name}
                      email={faculty.email}
                    >
                      <div className="flex flex-wrap flex-col m-4 gap-2">
                        {faculty.company === "" ? (
                          <div className="flex items-center gap-2">
                            <BsBuilding className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-400 text-sm">
                              Not Available
                            </span>
                          </div>
                        ) : (
                          <p className="flex items-center gap-2 hover:text-teal-600 transition duration-300">
                            <BsBuilding className="h-5 w-5" />
                            <span className="text-xl">{faculty.company}</span>
                          </p>
                        )}

                        {faculty.lpa === "" || faculty.lpa === null ? (
                          <div className="flex items-center gap-2">
                            <FaIndianRupeeSign className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-400 text-sm">
                              Not Available
                            </span>
                          </div>
                        ) : (
                          <p
                            href={faculty.lpa}
                            className="flex  items-center gap-2 hover:text-teal-600 transition duration-300"
                          >
                            <FaIndianRupeeSign className="h-5 w-5" />
                            <span className="text-xl break-all">
                              {faculty.lpa} LPA
                            </span>
                          </p>
                        )}
                      </div>
                    </FacultyCard>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  {filteredStudents.length === 0 ? 0 : indexOfFirstRow + 1} to{" "}
                  {Math.min(indexOfLastRow, filteredStudents.length)} of{" "}
                  {filteredStudents.length} entries
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
  );
}

export default TopPlacementCard;
