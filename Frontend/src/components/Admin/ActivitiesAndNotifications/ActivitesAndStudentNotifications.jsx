import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivitiesAndStudentNotificationsData } from "../../../Features/ActivitiesAndStudentNotificationsSlice";
import {
  HiChevronLeft,
  HiChevronRight,
  HiSearch,
  HiPencil,
  HiTrash,
} from "react-icons/hi";
import { MdImageNotSupported } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import MainCard from "../../Activites/MainCard";
import Loading from "../../UtilityCompoments/Loading";
import Errors from "../../UtilityCompoments/Errors";

function ActivitesAndStudentNotifications() {
  const dispatch = useDispatch();
  const {ActivitiesAndStudentNotifications, loading, error } = useSelector(
    (state) => state.ActivitiesAndStudentNotificationsData
  );

  // State Management
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  // Form States
  const [uploadForm, setUploadForm] = useState({
    name: "",
    link: "",
    file: null,
  });
  const [editForm, setEditForm] = useState({
    name: "",
    link: "",
    file: null,
  });

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchActivitiesAndStudentNotificationsData());
  }, [dispatch]);

  // Error handling
  const handleApiError = (err, action) => {
    const errorMessage =
      err.response?.error || err.error || err.response?.data?.message || `${action} failed. Please try again.`;
    toast.error(errorMessage);
  };
  // Upload Handler
  const handleUpload = async () => {
    if (!uploadForm.name) {
      return toast.error("Name is required");
    }
    if (!uploadForm.link && !uploadForm.file) {
      return toast.error("Link or file is required");
    }
    const MAX_SIZE_MB = 5;
    if (uploadForm.file) {
      if (uploadForm.file.size > MAX_SIZE_MB * 1024 * 1024) {
        setUploadForm({ ...uploadForm, file: null });
        return toast.error(`File size exceeds ${MAX_SIZE_MB}MB limit`);
      }
      const formData = new FormData();
      formData.append("name", uploadForm.name);
      formData.append("file", uploadForm.file);
      try {
        const loadingToast = toast.loading("Uploading Activities and Student Notifications...");
        await axios.post(
          "http://localhost:4000/api/uploadActivitiesAndStudentsNotifications",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await dispatch(fetchActivitiesAndStudentNotificationsData());
        toast.success("Activities and Student Notifications uploaded successfully!");
        setShowUploadModal(false);
        setUploadForm({
          name: "",
          link: "",
          file: null,
        });
        toast.dismiss(loadingToast);
      } catch (err) {
        handleApiError(err, "Upload");
      }
      

    }
    if (uploadForm.link) {
      const formData = new FormData();
      formData.append("name", uploadForm.name);
      formData.append("link", uploadForm.link);
      try {
        const loadingToast = toast.loading("Uploading Activities and Student Notifications...");
        await axios.post(
          "http://localhost:4000/api/uploadActivitiesAndStudentsNotifications",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await dispatch(fetchActivitiesAndStudentNotificationsData());
        toast.success("Activities and Student Notifications uploaded successfully!");
        setShowUploadModal(false);
        setUploadForm({
          name: "",
          link: "",
          file: null,
        });
        toast.dismiss(loadingToast);
      } catch (err) {
        handleApiError(err, "Upload");
      }
    }
  };

  // Update Handler
  const handleUpdate = async () => {
    try {
    const MAX_SIZE_MB = 5;
    if (editForm.file) {
      if (editForm.file.size > MAX_SIZE_MB * 1024 * 1024) {
        setEditForm({ ...editForm, file: null });
        return toast.error(`File size exceeds ${MAX_SIZE_MB}MB limit`);
      }
      const formData = new FormData();
      formData.append("name", editForm.name || "");
      formData.append("file", editForm.file);
      try {
        const loadingToast = toast.loading("Updating Activities and Student Notifications...");
        await axios.put(
          `http://localhost:4000/api/updateActivitiesAndStudentsNotifications/${selectedArea._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await dispatch(fetchActivitiesAndStudentNotificationsData());
        toast.success("Activities and Student Notifications updated successfully!");
        setShowEditModal(false);
        setEditForm({
          name: "",
          link: "",
          file: null,
        });
        toast.dismiss(loadingToast);
      } catch (err) {
        handleApiError(err, "Update");
      }
    }
    if (editForm.link) {
      const formData = new FormData();
      formData.append("name", editForm.name || "");
      formData.append("link", editForm.link);
      try {
        const loadingToast = toast.loading("Updating Activities and Student Notifications...");
        await axios.put(
          `http://localhost:4000/api/updateActivitiesAndStudentsNotifications/${selectedArea._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await dispatch(fetchActivitiesAndStudentNotificationsData());
        toast.success("Activities and Student Notifications updated successfully!");
        setShowEditModal(false);
        setEditForm({
          name: "",
          link: "",
          file: null,
        });
        toast.dismiss(loadingToast);
      } catch (err) {
        handleApiError(err, "Update");
      }
    }
  } catch (err) {
    handleApiError(err, "Update");
  }
 
  };

  // Delete Handler
  const handleDelete = async () => {
    try {
      const loadingToast = toast.loading("Deleting research area...");
      await axios.delete(
        `http://localhost:4000/api/deleteActivitiesAndStudentsNotifications/${selectedArea._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchActivitiesAndStudentNotificationsData());
      toast.success("Deleted Activities and Student Notifications successfully!");
      setShowDeleteModal(false);
      setSelectedArea(null);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "Delete");
    }
  };



  // Search and Pagination
  const filteredAreas = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return ActivitiesAndStudentNotifications.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, ActivitiesAndStudentNotifications]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(filteredAreas.length / rowsPerPage);
  const currentRows = filteredAreas.slice(indexOfFirstRow, indexOfLastRow);

  // Mobile Card Component
  // eslint-disable-next-line react/prop-types
  const MobileCard = ({ item }) => (
    <div className="card bg-base-100 max-w-xs shadow-xl">
      <div className="card-body items-center">
        <a className="font-semibold text-sm text-gray-700 text-decoration-none text-justify" href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>
        
        <div className="text-sm text-justify ">
         
          <p className="text-justify"> Created At: {item.createdAt} </p>
          <p className="text-justify"> Updated At: {item.updatedAt} </p>
        </div>
        <div className="card-actions mt-4">
          <button
            onClick={() => {
              setSelectedArea(item);
              setEditForm({ ...item, file: null });
              setShowEditModal(true);
            }}
            className="btn btn-sm btn-warning rounded-lg"
          >
            <HiPencil size={20} />
          </button>
          <button
            onClick={() => {
              setSelectedArea(item);
              setShowDeleteModal(true);
            }}
            className="btn btn-sm btn-error rounded-lg"
          >
            <HiTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return <MainCard title="Activities and Student Notifications"><Loading /></MainCard>;
  if (error) return <MainCard title="Activities and Student Notifications"><Errors error={error} /></MainCard>;

  return (
    <>
      {/* Modals */}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete Activities and Student Notifications</h3>
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
            <h3 className="text-lg font-bold mb-4">Add New Activities and Student Notifications </h3>
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
                  Link
                </label>
                <input
                  type="url"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.link}
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      link: e.target.value,
                    })
                  }
                />
              </div>
              <div className="divider">OR</div>

              <div>
                <label className="block text-sm font-medium mb-1">File</label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, file: e.target.files[0] })
                  }
                  accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png,.webp,.svg"
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
          <div className="bg-white rounded-lg p-6 lg:max-w-2xl w-full">
            <h3 className="text-lg font-bold mb-4">Edit Activities and Student Notifications</h3>
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
                  Link
                </label>
                <input
                  type="url"
                  className="w-full p-2 border rounded-md"
                  value={editForm.link}
                  onChange={(e) =>
                    setEditForm({ ...editForm, link: e.target.value })
                  }
                  accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png,.webp,.svg"
                />
              </div>
              <div className="divider">OR</div>
              <div>
                <label className="block text-sm font-medium mb-1">File</label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) =>
                    setEditForm({ ...editForm, file: e.target.files[0] })
                  }
                   accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png,.webp,.svg"
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

      <MainCard title="Activities and Student Notifications">
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
                    Add new Activities and Student Notifications
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
                          Name
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Link
                        </th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentRows.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                          <td className="py-3 px-4  font-medium text-sm text-justify">
                            <span className="block">Created At:</span>
                            {new Date(item.createdAt).toLocaleString()}
                            <br />
                            <span className="block">Updated At:</span>
                            {new Date(item.updatedAt).toLocaleString()}
                          </td>
                          <td className="py-3 px-4 font-medium text-sm break-all text-justify">
                            {item.name}
                          </td>
                         
                          <td className="py-3 px-4">
                          {
                            item.link ? (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 break-all"
                              >
                                Visit
                              </a>
                            ):(
                              <span className="text-gray-500">No Link</span>
                            )
                          }
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

export default ActivitesAndStudentNotifications;
