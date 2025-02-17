import React, { useState, useEffect, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import MainCard from "../../Activites/MainCard";
import { fetchVisions } from "../../../Features/VisionAndMissionslice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { HiPencil, HiTrash } from "react-icons/hi";
import Loading from "../../UtilityCompoments/Loading";
import Errors from "../../UtilityCompoments/Errors";
import Cookies from "js-cookie";

const Vision = () => {
  const dispatch = useDispatch();
  const { visions, loading, error } = useSelector(
    (state) => state.VisionAndMissionData
  );
  const token = Cookies.get("token");

  // Search and Pagination states
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newVision, setNewVision] = useState("");
  const [adding, setAdding] = useState(false);
  const [selectedVision, setSelectedVision] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [visionText, setVisionText] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    dispatch(fetchVisions());
  }, [dispatch]);

  useEffect(() => {
    if (selectedVision) {
      setVisionText(selectedVision.vision || "");
    }
  }, [selectedVision]);

  const handleAddVision = async (e) => {
    e.preventDefault();
    if (!newVision.trim()) {
      return toast.error("Vision text cannot be empty.");
    }

    try {
      setAdding(true);
      const loadingToast = toast.loading("Adding vision...");

      await axios.post(
        "http://localhost:4000/api/visions",
        { vision: newVision },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await dispatch(fetchVisions());
      toast.success("Vision added successfully!");
      setNewVision("");
      setShowAddModal(false);
      toast.dismiss(loadingToast);
    } catch (err) {
      console.error("Error adding vision:", err);
      toast.error("Failed to add vision.");
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
    if (!visionText.trim())
      return toast.error("Please fill out the vision text.");

    try {
      setUpdating(true);
      const loadingToast = toast.loading("Updating vision...");
      await axios.put(
        `http://localhost:4000/api/visions/${selectedVision._id}`,
        { vision: visionText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await dispatch(fetchVisions());
      toast.success("Vision updated successfully!");
      setShowUpdateModal(false);
      setSelectedVision(null);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "update");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      const loadingToast = toast.loading("Deleting vision...");
      await axios.delete(
        `http://localhost:4000/api/visions/${selectedVision._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await dispatch(fetchVisions());
      toast.success("Vision deleted successfully!");
      setShowDeleteModal(false);
      setSelectedVision(null);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "delete");
    }
  };

  const filteredVisions = useMemo(
    () =>
      visions.filter((v) =>
        v.vision.toLowerCase().includes(search.toLowerCase())
      ),
    [visions, search]
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredVisions.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredVisions.length / rowsPerPage);

  return (
    <MainCard title="Our Vision">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this vision?</p>
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

      {/* Update Vision Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Update Vision</h3>
            <form onSubmit={handleUpdate}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Vision
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-32"
                    value={visionText}
                    onChange={(e) => setVisionText(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowUpdateModal(false);
                    setSelectedVision(null);
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
                  {updating ? "Updating..." : "Update Vision"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Vision Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Add New Vision</h3>
            <form onSubmit={handleAddVision}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Vision
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-32"
                    value={newVision}
                    onChange={(e) => setNewVision(e.target.value)}
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
                  {adding ? "Adding..." : "Add Vision"}
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
            <div className="flex justify-between items-center mb-6">
              <div className="w-full sm:w-96 relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Search visions"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search visions"
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
                  className="btn btn-warning btn-sm rounded-lg gap-2"
                >
                  <HiPencil size={18} /> Add Vision
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
                  {currentRows.map((vision) => (
                    <div key={vision._id} className="card shadow-xl">
                      <div className="card-body p-6">
                        <div className="flex flex-col gap-4">
                          <div className="flex-1">
                            <p className="text-gray-700 whitespace-pre-wrap break-words">
                              {vision.vision || "No vision statement found"}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              <p>
                                Created:{" "}
                                {new Date(
                                  vision.createdAt
                                ).toLocaleDateString()}
                              </p>
                              <p>
                                Updated:{" "}
                                {new Date(
                                  vision.updatedAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => {
                                  setSelectedVision(vision);
                                  setShowUpdateModal(true);
                                }}
                                aria-label="Edit vision"
                              >
                                <HiPencil size={16} />
                              </button>
                              <button
                                className="btn btn-sm btn-error"
                                onClick={() => {
                                  setSelectedVision(vision);
                                  setShowDeleteModal(true);
                                }}
                                aria-label="Delete vision"
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
                    {Math.min(indexOfLastRow, filteredVisions.length)} of{" "}
                    {filteredVisions.length} entries
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

export default Vision;
