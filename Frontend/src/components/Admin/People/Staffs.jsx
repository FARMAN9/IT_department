import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsData } from "../../../Features/StudentsSlice";
import {
  HiChevronLeft,
  HiChevronRight,
  HiSearch,
  HiPencil,
  HiTrash,
} from "react-icons/hi";
import { FaFilePdf } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import MainCard from "../../Activites/MainCard";
import Loading from "../../UtilityCompoments/Loading";
import Errors from "../../UtilityCompoments/Errors";

function Students() {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector(
    (state) => state.StudentsData
  );

  // State Management
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Form States
  const [uploadForm, setUploadForm] = useState({
    programme: "",
    batch: "",
    file: null,
  });
  const [editForm, setEditForm] = useState({
    programme: "",
    batch: "",
    file: null,
  });

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchStudentsData());
  }, [dispatch]);

  // Error handling
  const handleApiError = (err, action) => {
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      `${action} failed. Please try again.`;
    toast.error(errorMessage);
  };

  // Upload Handler
  const handleUpload = async () => {
    if (!uploadForm.file || !uploadForm.programme || !uploadForm.batch) {
      return toast.error("Please fill all required fields");
    }

    const MAX_SIZE_MB = 5;
    if (uploadForm.file.size > MAX_SIZE_MB * 1024 * 1024) {
      return toast.error(`File size exceeds ${MAX_SIZE_MB}MB limit`);
    }

    const formData = new FormData();
    formData.append("Programe", uploadForm.programme);
    formData.append("Batch", uploadForm.batch);
    formData.append("pdf", uploadForm.file);

    try {
      const loadingToast = toast.loading("Uploading syllabus...");
      await axios.post("http://localhost:4000/api/uploadStudents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      await dispatch(fetchStudentsData());
      toast.success("Students uploaded successfully!");
      setShowUploadModal(false);
      setUploadForm({ programme: "", batch: "", file: null });
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "upload");
    }
  };

  // Update Handler
  const handleUpdate = async () => {
    if (!editForm.programme || !editForm.batch) {
      return toast.error("Please fill required fields");
    }

    const formData = new FormData();
    formData.append("Programe", editForm.programme);
    formData.append("Batch", editForm.batch);
    if (editForm.file) {
      formData.append("pdf", editForm.file);
    }

    try {
      const loadingToast = toast.loading("Updating Students...");
      await axios.put(
        `http://localhost:4000/api/uploadStudents/${selectedStudent._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchStudentsData());
      toast.success("Students updated successfully!");
      setShowEditModal(false);
      setEditForm({ programme: "", batch: "", file: null });
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "update");
    }
  };

  // Delete Handler
  const handleDelete = async () => {
    try {
      const loadingToast = toast.loading("Deleting Students...");
      await axios.delete(
        `http://localhost:4000/api/deleteStudents/${selectedStudent._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchStudentsData());
      toast.success("Students deleted successfully!");
      setShowDeleteModal(false);
      setSelectedStudent(null);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "delete");
    }
  };

  // Search and Pagination
  const filteredStudents = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return students.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, students]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const currentRows = filteredStudents.slice(indexOfFirstRow, indexOfLastRow);

  // Mobile Card Component
  const MobileCard = ({ item }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal-600 mb-3">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800">{item.Programe}</h3>
          <span className="text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded">
            Batch {item.Batch}
          </span>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <a
            href={item.Syllabus}
            className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setSelectedSyllabus(item);
                setEditForm({
                  programme: item.Programme,
                  batch: item.Batch,
                  file: null,
                });
                setShowEditModal(true);
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              <HiPencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setSelectedSyllabus(item);
                setShowDeleteModal(true);
              }}
              className="text-red-600 hover:text-red-800"
            >
              <HiTrash className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <Loading />;
  if (error) return <Errors error={error} />;

  return (
    <>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this students ?{" "}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Upload New Syllabus</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Programme
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.programme}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, programme: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Batch</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.batch}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, batch: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Student File (PDF)
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, file: e.target.files[0] })
                  }
                  accept="application/pdf"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button onClick={handleUpload} className="btn btn-primary">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Edit Student</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Programme
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={editForm.programme}
                  onChange={(e) =>
                    setEditForm({ ...editForm, programme: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Batch</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={editForm.batch}
                  onChange={(e) =>
                    setEditForm({ ...editForm, batch: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Update File{" "}
                  <div className="text-red-500 border border-gray-300 p-2 flex rounded-md w-full flex-wrap overflow-hidden">
                    <p className="text-xs w-full">
                      <a href={selectedStudent.Students}>
                        <FaFilePdf size={20} /> {selectedStudent.Students}
                      </a>
                    </p>
                  </div>
                </label>

                <input
                  type="file"
                  required
                  className="file-input file-input-bordered w-full"
                  onChange={(e) =>
                    setEditForm({ ...editForm, file: e.target.files[0] })
                  }
                  accept="application/pdf"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button onClick={handleUpdate} className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <MainCard title="Staffs">
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
                      placeholder="Search Students..."
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
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="btn btn-sm btn-warning rounded-lg"
                  >
                    <HiPencil className="w-5 h-5" />
                    Upload New
                  </button>
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
                          Download
                        </th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 uppercase">
                          Actions
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
                            Batch {item.Batch}
                          </td>
                          <td className="py-3 px-4 text-gray-900">
                            <a
                              href={item.Students}
                              className="text-teal-600 hover:text-teal-800 font-medium inline-flex items-center gap-1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Download
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                            </a>
                          </td>
                          <td className="py-3 px-4 text-center flex justify-center items-center gap-4">
                            <button
                              onClick={() => {
                                setSelectedStudent(item);
                                setEditForm({
                                  programme: item.Programe,
                                  batch: item.Batch,
                                  file: null,
                                });
                                setShowEditModal(true);
                              }}
                              className="btn btn-sm  z-10 btn-warning rounded-lg"
                            >
                              <HiPencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedStudent(item);
                                setShowDeleteModal(true);
                              }}
                              className="btn btn-sm z-10 btn-error rounded-lg"
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
                <div className="md:hidden space-y-3">
                  {currentRows.map((item, index) => (
                    <MobileCard key={index} item={item} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstRow + 1} to{" "}
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
    </>
  );
}

export default Students;
