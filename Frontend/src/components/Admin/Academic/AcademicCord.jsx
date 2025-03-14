import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcademicCoordinatorsData } from "../../../Features/AcademicCoordinatorSlice";
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

function AcademicCord() {
  const dispatch = useDispatch();
  const { AcademicCoordinator, loading, error } = useSelector(
    (state) => state.AcademicCoordinatorData
  );

  // State Management
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAcademicCoordinator, setSelectedAcademicCoordinator] =
    useState(null);

  // Form States
  const [uploadForm, setUploadForm] = useState({
    programme: "",
    batch: "",
    semester: "",
    coordinators: "",
    type : "",
    session: "",
  });
  const [editForm, setEditForm] = useState({
    programme: "",
    batch: "",
    semester: "",
    type : "",
    coordinators: "",
    session: "",
  });

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

  // Upload Handler
  const handleUpload = async () => {
    if (
      !uploadForm.programme ||
      !uploadForm.batch ||
      !uploadForm.semester ||
      !uploadForm.coordinators ||
      !uploadForm.session||
      !uploadForm.name
    ) {
      return toast.error("Please fill all required fields");
    }

    const formData = new FormData();
    formData.append("Programe", uploadForm.programme);
    formData.append("Batch", uploadForm.batch);
    formData.append("Semester", uploadForm.semester);
    formData.append("Coordinators", uploadForm.coordinators);
    formData.append("Session", uploadForm.session);
    formData.append("Name", uploadForm.name);
    // Ensure the file is included

    try {
      const loadingToast = toast.loading("Uploading Academic Coordinator...");

      await axios.post(
        "http://localhost:4000/api/uploadAcademicCoordinators",
        formData,
        {
          headers: {
            "Content-Type": "application/json", //IMPORTANT TEXT ONLY
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchAcademicCoordinatorsData());
      toast.success("Academic Coordinator uploaded successfully!");
      setShowUploadModal(false);

      // Reset the form correctly
      setUploadForm({
        programme: "",
        batch: "",
        semester: "",
        type : "",
        coordinators: "",
        session: "",
        name: ""
      });

      toast.dismiss(loadingToast);
    } catch (err) {
      console.log(err);
      handleApiError(err, "upload");
    }
  };

  // Update Handler
  const handleUpdate = async () => {
    if (!editForm.programme || !editForm.batch || !editForm.semester) {
      return toast.error("Please fill required fields");
    }

    const formData = new FormData();
    formData.append("Programe", editForm.programme);
    formData.append("Batch", editForm.batch);
    formData.append("Semester", editForm.semester);
    formData.append("Coordinators", editForm.coordinators);
    formData.append("Session", editForm.session);
    formData.append("Name", editForm.name);

    try {
      const loadingToast = toast.loading("Updating Academic Coordinator...");
      await axios.put(
        `http://localhost:4000/api/uploadAcademicCoordinators/${selectedAcademicCoordinator._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchAcademicCoordinatorsData());
      toast.success("Academic Coordinator updated successfully!");
      setShowEditModal(false);
      setEditForm({
        programme: "",
        batch: "",
        semester: "",
        name : "",
        coordinators: "",
        session: "",
      });
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "update");
    }
  };

  // Delete Handler
  const handleDelete = async () => {
    try {
      const loadingToast = toast.loading("Deleting Academic Coordinator...");
      await axios.delete(
        `http://localhost:4000/api/deleteAcademicCoordinators/${selectedAcademicCoordinator._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchAcademicCoordinatorsData());
      toast.success("Academic Coordinator deleted successfully!");
      setShowDeleteModal(false);
      setSelectedAcademicCoordinator(null);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "delete");
    }
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
    <div className="bg-white p-1 rounded-lg shadow-sm  border-l-4 border-teal-600 ">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800">{item.Programe}</h3>
          <span className="text-sm bg-gray-400 rounded-md p-1 text-black">
            Created: {new Date(item.createdAt).toLocaleString()} <br />
            Updated: {new Date(item.updatedAt).toLocaleString()}
          </span>
        </div>
        <span className="text-sm text-teal-800 flex-wrap rounded p-2">
          Batch : {item.Batch} <br />
          Semester : {item.Semester}
          <br />
          Session : {item.Session} <br />
        
          Coordinators (type) : {item.Coordinators}
          <br />
          Name : {item.Name}
        </span>
        <div className="mt-2 flex justify-between items-center">
          <div className="flex items-end gap-2">
            <button
              onClick={() => {
                setSelectedAcademicCoordinator(item);
                setEditForm({
                  programme: item.Programe,
                  batch: item.Batch,
                  semester: item.Semester,
                  session: item.Session,
                  coordinators: item.Coordinators,
                  name: item.Name
                  
                });
                setShowEditModal(true);
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              <HiPencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setSelectedAcademicCoordinator(item);
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

  if (loading) return <MainCard title="academic coordinators" ><Loading /></MainCard>;
  if (error) return <MainCard title="academic coordinators" ><Errors error={error} /></MainCard>;

  return (
    <>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this Academic Coordinator?
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
            <h3 className="text-lg font-bold mb-4">
              Upload New Academic Coordinator
            </h3>
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
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.batch}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, batch: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Semester
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.semester}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, semester: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Session
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.session}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, session: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Coordinators <span className="text-sm  bold bg-gray-400 rounded-md p-1 text-black">Type</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.coordinators}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, coordinators: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.name}
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      name: e.target.value,
                    })
                  }
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
            <h3 className="text-lg font-bold mb-4">
              Edit Academic Coordinator
            </h3>
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
                  Semester
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={editForm.semester}
                  onChange={(e) =>
                    setEditForm({ ...editForm, semester: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Session
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={editForm.session}
                  onChange={(e) =>
                    setEditForm({ ...editForm, session: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                Coordinators <span className="text-sm  bold bg-gray-400 rounded-md p-1 text-black">Type</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={editForm.coordinators}
                  onChange={(e) =>
                    setEditForm({ ...editForm, coordinators: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
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
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="btn btn-sm btn-warning rounded-lg"
                  >
                    <HiPencil className="w-5 h-5" />
                    Add New Academic Coordinator
                  </button>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto rounded-lg border">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Date
                        </th>
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
                          Coordinators <span className="text-sm  bold bg-gray-400 rounded-md p-1 text-black">Type</span>
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Name
                        </th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentRows.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900 flex flex-col">
                           
                            <span className="text-md  bold bg-gray-400 rounded-md p-1 text-black"> Created At: {new Date(item.createdAt).toLocaleString()}</span>
                            <br className="m-1" />
                            <span className="text-md  bold bg-gray-400 rounded-md p-1 text-black"> Updated At: {new Date(item.updatedAt).toLocaleString()}</span>

                          </td>
                          
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
                          <td className="py-3 px-4 text-center flex justify-center items-center gap-4">
                            <button
                              onClick={() => {
                                setSelectedAcademicCoordinator(item);
                                setEditForm({
                                  programme: item.Programe,
                                  batch: item.Batch,
                                  semester: item.Semester,
                                  session: item.Session,
                                  coordinators: item.Coordinators,
                                  name: item.Name
                                });
                                setShowEditModal(true);
                              }}
                              className="btn btn-sm  z-10 btn-warning rounded-lg"
                            >
                              <HiPencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedAcademicCoordinator(item);
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
                <div className="md:hidden space-y-3 *:">
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
