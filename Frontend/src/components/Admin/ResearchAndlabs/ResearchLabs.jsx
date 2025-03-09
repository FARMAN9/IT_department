import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResearchAreasData } from "../../../Features/ResearchAreaSlice";
import {
  HiChevronLeft,
  HiChevronRight,
  HiSearch,
  HiPencil,
  HiTrash,
  HiUpload,
} from "react-icons/hi";
import { MdImageNotSupported } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import MainCard from "../../Activites/MainCard";
import Loading from "../../UtilityCompoments/Loading";
import Errors from "../../UtilityCompoments/Errors";

function ResearchLabs() {
  const dispatch = useDispatch();
  const { researchAreas, loading, error } = useSelector(
    (state) => state.ResearchAreaData
  );

  // State Management
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRemoveImageModal, setShowRemoveImageModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [showUploadLabManualModal, setShowUploadLabManualModal] =
    useState(false);
  const [showRemoveLabManualModal, setShowRemoveLabManualModal] =
    useState(false);
  const [labManualFile, setLabManualFile] = useState(null);

  // Form States
  const [uploadForm, setUploadForm] = useState({
    name: "",
    description: "",
    location: "",
    file: null,
  });
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    location: "",
    file: null,
  });

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchResearchAreasData());
  }, [dispatch]);

  // Error handling
  const handleApiError = (err, action) => {
    const errorMessage =
      err.response?.error || err.error || `${action} failed. Please try again.`;
    toast.error(errorMessage);
  };

  // Upload Handler
  const handleUpload = async () => {
    if (!uploadForm.name) {
      return toast.error("Name is required");
    }
    if (!uploadForm.location) {
      return toast.error("Location is required");
    }
    if (!uploadForm.description) {
      return toast.error("Description is required");
    }

    const MAX_SIZE_MB = 5;
    if (uploadForm.file) {
      if (!uploadForm.file.type.startsWith("image/")) {
        setUploadForm({ ...uploadForm, file: null });
        return toast.error("Please upload an image file (JPEG, PNG, etc.)");
      }
      if (uploadForm.file.size > MAX_SIZE_MB * 1024 * 1024) {
        setUploadForm({ ...uploadForm, file: null });
        return toast.error(`File size exceeds ${MAX_SIZE_MB}MB limit`);
      }
    }

    const formData = new FormData();
    formData.append("name", uploadForm.name);
    formData.append("description", uploadForm.description);
    formData.append("location", uploadForm.location);
    formData.append("image", uploadForm.file || "");

    try {
      const loadingToast = toast.loading("Uploading research area...");
      await axios.post(
        "http://localhost:4000/api/uploadResearchAreas",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchResearchAreasData());
      toast.success("Research area uploaded successfully!");
      setShowUploadModal(false);
      setUploadForm({
        name: "",
        description: "",
        location: "",
        file: null,
      });
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "Upload");
    }
  };

  // Update Handler
  const handleUpdate = async () => {
    const MAX_SIZE_MB = 5;
    if (editForm.file) {
      if (!editForm.file.type.startsWith("image/")) {
        setEditForm({ ...editForm, file: null });
        return toast.error("Please upload an image file (JPEG, PNG, etc.)");
      }
      if (editForm.file.size > MAX_SIZE_MB * 1024 * 1024) {
        setEditForm({ ...editForm, file: null });
        return toast.error(`File size exceeds ${MAX_SIZE_MB}MB limit`);
      }
    }

    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("description", editForm.description);
    formData.append("location", editForm.location);
    if (editForm.file) formData.append("image", editForm.file);

    try {
      const loadingToast = toast.loading("Updating research area...");
      await axios.put(
        `http://localhost:4000/api/updateResearchArea/${selectedArea._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchResearchAreasData());
      toast.success("Research area updated successfully!");
      setShowEditModal(false);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "Update");
    }
  };

  // Delete Handler
  const handleDelete = async () => {
    try {
      const loadingToast = toast.loading("Deleting research area...");
      await axios.delete(
        `http://localhost:4000/api/deleteResearchArea/${selectedArea._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchResearchAreasData());
      toast.success("Research area deleted successfully!");
      setShowDeleteModal(false);
      setSelectedArea(null);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "Delete");
    }
  };

  const handleRemoveImage = async () => {
    try {
      const loadingToast = toast.loading("Removing image...");
      await axios.put(
        `http://localhost:4000/api/removeResearchAreaImage/${selectedArea._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await dispatch(fetchResearchAreasData());
      toast.success("Image removed successfully!");
      setShowRemoveImageModal(false);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "Remove Image");
    }
  };

  // Upload Lab Manual Handler
  const handleUploadLabManual = async () => {
    if (!labManualFile) return toast.error("Please select a file");

    const MAX_SIZE_MB = 10;
    if (labManualFile.size > MAX_SIZE_MB * 1024 * 1024) {
      setLabManualFile(null);
      return toast.error(`File size exceeds ${MAX_SIZE_MB}MB limit`);
    }

    const formData = new FormData();
    formData.append("labManual", labManualFile);

    try {
      const loadingToast = toast.loading("Uploading lab manual...");
      await axios.put(
        `http://localhost:4000/api/uploadLabManual/${selectedArea._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchResearchAreasData());
      toast.success("Lab manual uploaded successfully!");
      setShowUploadLabManualModal(false);
      setLabManualFile(null);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "Lab Manual Upload");
    }
  };

  // Remove Lab Manual Handler
  const handleRemoveLabManual = async () => {
    try {
      const loadingToast = toast.loading("Removing lab manual...");
      await axios.put(
        `http://localhost:4000/api/removeLabManual/${selectedArea._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchResearchAreasData());
      toast.success("Lab manual removed successfully!");
      setShowRemoveLabManualModal(false);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "Lab Manual Removal");
    }
  };

  // Search and Pagination
  const filteredAreas = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return researchAreas.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, researchAreas]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(filteredAreas.length / rowsPerPage);
  const currentRows = filteredAreas.slice(indexOfFirstRow, indexOfLastRow);

  // Mobile Card Component
  const MobileCard = ({ item }) => (
    <div className="card bg-base-100 max-w-xs shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={item.image}
          alt={item.name}
          className="w-60 h-60 rounded-md object-cover border-2 border-teal-600 border-dashed"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{item.name}</h2>
        <div className="text-sm">
          <p className="font-semibold">Location: {item.location || "N/A"}</p>
          <p className="mt-2">
            {" "}
            <span className="font-semibold">Description:</span>{" "}
            {item.description || "N/A"}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Lab Manual:</span>
            {item.lab_manual ? (
              <a
                href={item.lab_manual}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Download
              </a>
            ) : (
              "N/A"
            )}
          </p>
        </div>
        <div className="card-actions mt-4">
          <button
            onClick={() => {
              setSelectedArea(item);
              setEditForm({ ...item, file: null });
              setShowEditModal(true);
            }}
            className="btn btn-sm btn-warning"
          >
            <HiPencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedArea(item);
              setShowDeleteModal(true);
            }}
            className="btn btn-sm btn-error"
          >
            <HiTrash className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedArea(item);
              setShowRemoveImageModal(true);
            }}
            className="btn btn-sm btn-info"
          >
            <MdImageNotSupported className="w-4 h-4" />
          </button>

          {/* Add these buttons in MobileCard actions */}
          <button
            onClick={() => {
              setSelectedArea(item);
              setShowUploadLabManualModal(true);
            }}
            className="btn btn-sm bg-teal-600"
          >
            <HiUpload className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedArea(item);
              setShowRemoveLabManualModal(true);
            }}
            className="btn btn-sm btn-error"
          >
            <HiTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return <Loading />;
  if (error) return <Errors error={error} />;

  return (
    <>
      {/* Modals */}
      {/* Upload Lab Manual Modal */}
      {showUploadLabManualModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Upload Lab Manual</h3>
            <div className="space-y-4">
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={(e) => setLabManualFile(e.target.files[0])}
                accept="application/pdf"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowUploadLabManualModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadLabManual}
                  className="btn btn-primary"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Remove Lab Manual Modal */}
      {showRemoveLabManualModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Remove Lab Manual</h3>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRemoveLabManualModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button onClick={handleRemoveLabManual} className="btn btn-error">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {showRemoveImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Image Removal</h3>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRemoveImageModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button onClick={handleRemoveImage} className="btn btn-error">
                Remove Image
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
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

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Add New Lab</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.name}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.description}
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.location}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, location: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, file: e.target.files[0] })
                  }
                  accept="image/*"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button onClick={handleUpload} className="btn btn-primary">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedArea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Edit Lab </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                {selectedArea.image && (
                  <img
                    src={selectedArea.image}
                    alt="Current"
                    className="w-full h-32 object-cover mb-2"
                  />
                )}
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) =>
                    setEditForm({ ...editForm, file: e.target.files[0] })
                  }
                  accept="image/*"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button onClick={handleUpdate} className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                        {[5, 10, 25, 50].map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="btn btn-sm btn-warning rounded-lg"
                  >
                    <HiPencil className="w-5 h-5" />
                    Add New Lab
                  </button>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto rounded-lg border">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Image
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Name
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Description
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Location
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Lab Manual
                        </th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentRows.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-90 h-60 rounded-md object-fit border-2 border-teal-600 border-dashed break-all "
                            />
                          </td>
                          <td className="py-3 px-4 font-medium text-sm break-all text-justify">
                            {item.name}
                          </td>
                          <td className="py-3 px-4 max-w-xs break-all overflow-hidden">
                            {item.description}
                          </td>
                          <td className="py-3 px-4">{item.location}</td>
                          <td className="py-3 px-4">
                            {item.labManual ? (
                              <a
                                href={item.labManual}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-600 hover:underline"
                              >
                                Download
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td className="py-3 px-4 flex justify-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedArea(item);
                                setEditForm({ ...item, file: null });
                                setShowEditModal(true);
                              }}
                              className="btn btn-sm btn-warning"
                            >
                              <HiPencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedArea(item);
                                setShowDeleteModal(true);
                              }}
                              className="btn btn-sm btn-error"
                            >
                              <HiTrash className="w-5 h-5" />
                            </button>

                            <button
                              onClick={() => {
                                setSelectedArea(item);
                                setShowRemoveImageModal(true);
                              }}
                              className="btn btn-sm btn-info"
                            >
                              <MdImageNotSupported className="w-5 h-5" />
                            </button>

                            <button
                              onClick={() => {
                                setSelectedArea(item);
                                setShowUploadLabManualModal(true);
                              }}
                              className="btn btn-sm bg-teal-600 "
                            >
                              <HiUpload className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedArea(item);
                                setShowRemoveLabManualModal(true);
                              }}
                              className="btn btn-sm btn-error"
                            >
                              <HiTrash className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {currentRows.map((item) => (
                    <MobileCard key={item._id} item={item} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstRow + 1} to{" "}
                    {Math.min(indexOfLastRow, filteredAreas.length)} of{" "}
                    {filteredAreas.length} entries
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

export default ResearchLabs;
