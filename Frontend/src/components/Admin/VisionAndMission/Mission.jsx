import React, { useState, useEffect, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import MainCard from "../../Activites/MainCard";
import { fetchMissions } from "../../../Features/VisionAndMissionslice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { HiPencil, HiTrash } from "react-icons/hi";
import Loading from "../../UtilityCompoments/Loading";
import Errors from "../../UtilityCompoments/Errors";
import Cookies from "js-cookie";

const Mission = () => {
  const dispatch = useDispatch();
  const { missions, loading, error } = useSelector(
    (state) => state.VisionAndMissionData
  );
  const token = Cookies.get("token");

  // Search and Pagination states
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newMission, setNewMission] = useState("");
  const [adding, setAdding] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [missionText, setMissionText] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  useEffect(() => {
    if (selectedMission) {
      setMissionText(selectedMission.mission || "");
    }
  }, [selectedMission]);

  const handleAddMission = async (e) => {
    e.preventDefault();
    if (!newMission.trim()) {
      return toast.error("Mission text cannot be empty.");
    }

    try {
      setAdding(true);
      const loadingToast = toast.loading("Adding mission...");

      await axios.post(
        "http://localhost:4000/api/missions",
        { mission: newMission },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await dispatch(fetchMissions());
      toast.success("Mission added successfully!");
      setNewMission("");
      setShowAddModal(false);
      toast.dismiss(loadingToast);
    } catch (err) {
      console.error("Error adding mission:", err);
      toast.error("Failed to add mission.");
    } finally {
      setAdding(false);
    }
  };

  const handleApiError = (err, action) => {
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      `${action} failed. Please try again.`;
    toast.error(errorMessage);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!missionText.trim())
      return toast.error("Please fill out the mission text.");

    try {
      setUpdating(true);
      const loadingToast = toast.loading("Updating mission...");
      await axios.put(
        `http://localhost:4000/api/missions/${selectedMission._id}`,
        { mission: missionText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await dispatch(fetchMissions());
      toast.success("Mission updated successfully!");
      setShowUpdateModal(false);
      setSelectedMission(null);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "update");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      const loadingToast = toast.loading("Deleting mission...");
      await axios.delete(
        `http://localhost:4000/api/missions/${selectedMission._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await dispatch(fetchMissions());
      toast.success("Mission deleted successfully!");
      setShowDeleteModal(false);
      setSelectedMission(null);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "delete");
    }
  };

  const filteredMissions = useMemo(
    () =>
      missions.filter((m) =>
        m.mission.toLowerCase().includes(search.toLowerCase())
      ),
    [missions, search]
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredMissions.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredMissions.length / rowsPerPage);

  return (
    <MainCard title="Our Mission">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this mission?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="btn btn-error">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Mission Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Update Mission</h3>
            <form onSubmit={handleUpdate}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mission
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-32"
                    value={missionText}
                    onChange={(e) => setMissionText(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowUpdateModal(false);
                    setSelectedMission(null);
                  }}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Update Mission"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Mission Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Add New Mission</h3>
            <form onSubmit={handleAddMission}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mission
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-32"
                    value={newMission}
                    onChange={(e) => setNewMission(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={adding}
                >
                  {adding ? "Adding..." : "Add Mission"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-auto flex">
        <div className="rounded-lg w-full">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-6">
              <div className="w-full sm:w-96 relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Search missions"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search missions"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
                    className="border rounded-lg px-3 py-1"
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    {[6, 9, 12, 24, 50].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn-warning btn-sm rounded-lg  gap-2"
                >
                  <HiPencil size={18} /> Add Mission
                </button>
              </div>
            </div>

            {loading ? (
              <Loading />
            ) : error ? (
              <Errors error={error.error} />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4">
                  {currentRows.map((mission) => (
                    <div key={mission._id} className="card shadow-xl">
                      <div className="card-body p-6">
                        <div className="flex flex-col gap-4">
                          <div className="flex-1">
                            <p className="text-gray-700 whitespace-pre-wrap break-words">
                              {mission.mission || "No mission statement found"}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              <p>
                                Created:{" "}
                                {new Date(
                                  mission.createdAt
                                ).toLocaleDateString()}
                              </p>
                              <p>
                                Updated:{" "}
                                {new Date(
                                  mission.updatedAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => {
                                  setSelectedMission(mission);
                                  setShowUpdateModal(true);
                                }}
                                aria-label="Edit mission"
                              >
                                <HiPencil size={16} />
                              </button>
                              <button
                                className="btn btn-sm btn-error"
                                onClick={() => {
                                  setSelectedMission(mission);
                                  setShowDeleteModal(true);
                                }}
                                aria-label="Delete mission"
                              >
                                <HiTrash size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
                  <div className="text-sm text-gray-600 whitespace-nowrap">
                    Showing {indexOfFirstRow + 1} to{" "}
                    {Math.min(indexOfLastRow, filteredMissions.length)} of{" "}
                    {filteredMissions.length} entries
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div className="flex gap-1 flex-wrap">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === i + 1
                              ? "bg-teal-600 text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainCard>
  );
};

export default Mission;
