import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchStaffsData } from "../../../Features/StaffsSlice";
import {
  HiChevronLeft,
  HiChevronRight,
  HiSearch,
  HiPencil,
  HiTrash,
} from "react-icons/hi";
import { MdImageNotSupported } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import MainCard from "../../Activites/MainCard";
import Loading from "../../UtilityCompoments/Loading";
import Errors from "../../UtilityCompoments/Errors";

function Staffs() {
  const dispatch = useDispatch();
  const { staffs, loading, error } = useSelector((state) => state.StaffsData);

  // State Management
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRemoveImageModal, setShowRemoveImageModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Form States
  const [uploadForm, setUploadForm] = useState({
    name: "",
    email: "",
    mobile: "",

    file: null,
  });
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    mobile: "",

    file: null,
  });

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchStaffsData());
  }, [dispatch]);

  // Error handling
  const handleApiError = (err, action) => {
    const errorMessage =
      err.response?.error || err.error || `${action} failed. Please try again.`;
    toast.error(errorMessage);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Upload Handler
  const handleUpload = async () => {
    if (!uploadForm.name || !uploadForm.email) {
      return toast.error("Name and email are required");
    }
    if (!isValidEmail(uploadForm.email)) {
      return toast.error("Please enter a valid email address");
    }

    // Check for existing email
    const emailExists = staffs.some(
      (staff) => staff.email.toLowerCase() === uploadForm.email.toLowerCase()
    );
    if (emailExists) {
      return toast.error("Email already exists");
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
    Object.entries(uploadForm).forEach(([key, value]) => {
      if (key !== "file" && value) formData.append(key, value);
    });
    if (uploadForm.file) formData.append("image", uploadForm.file);

    try {
      const loadingToast = toast.loading("Uploading staff...");
      await axios.post("http://localhost:4000/api/uploadStaffs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      await dispatch(fetchStaffsData());
      toast.success("Staff uploaded successfully!");
      setShowUploadModal(false);
      setUploadForm({
        name: "",
        email: "",
        mobile: "",
        file: null,
      });
      toast.dismiss(loadingToast);
    } catch (err) {
      console.log(JSON.stringify(err));
      handleApiError(err, "Upload");
    }
  };

  // Update Handler
  const handleUpdate = async () => {
    if (!isValidEmail(editForm.email)) {
      return toast.error("Please enter a valid email address");
    }
    // Check for existing email
    const emailExists = staffs.some(
      (staff) =>
        staff.email.toLowerCase() === editForm.email.toLowerCase() &&
        staff._id !== selectedStaff._id
    );
    if (emailExists) {
      return toast.error("Email already exists");
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
    formData.append("name", editForm.name || "");
    formData.append("email", editForm.email || "");
    formData.append("mobile", editForm.mobile || "");

    if (editForm.file) formData.append("image", editForm.file);

    try {
      const loadingToast = toast.loading("Updating staff...");
      const response = await axios.put(
        `http://localhost:4000/api/updateStaffs/${selectedStaff._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response", response);
      await dispatch(fetchStaffsData());
      toast.success("Staff updated successfully!");
      setShowEditModal(false);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "Update");
    }
  };

  // Delete Handler
  const handleDelete = async () => {
    try {
      const loadingToast = toast.loading("Deleting staff...");
      await axios.delete(
        `http://localhost:4000/api/deleteStaffs/${selectedStaff._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchStaffsData());
      toast.success("Staff deleted successfully!");
      setShowDeleteModal(false);
      setSelectedStaff(null);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "Delete");
    }
  };
  const handleRemoveImage = async () => {
    try {
      const loadingToast = toast.loading("Removing image...");
      await axios.put(
        `http://localhost:4000/api/removeStaffsImage/${selectedStaff._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await dispatch(fetchStaffsData());
      toast.success("Image removed successfully!");
      setShowRemoveImageModal(false);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "Remove Image");
    }
  };

  // Search and Pagination
  const filteredStaffs = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return staffs.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, staffs]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(filteredStaffs.length / rowsPerPage);
  const currentRows = filteredStaffs.slice(indexOfFirstRow, indexOfLastRow);

  // Mobile Card Component
  const MobileCard = ({ item }) => (
    <div className="card bg-base-100 max-w-xs  shadow-xl">
      <figure className="px-10 pt-10 ">
        <img
          src={item.image}
          alt={item.name}
          className="w-60 h-60 rounded-md object-cover border-2 border-teal-600 border-dashed"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title overflow-hidden whitespace-pre-wrapb break-all ">
          {item.name}
        </h2>
        <a
          className="text-blue-500 hover:text-blue-700"
          href={`mailto:${item.email || "N/A"}`}
        >
          {item.email || "N/A"}
        </a>
        <hr className="bg-black flex-wrap w-full h-0.5" />
        <div className="card-actions p-0  w-full flex-wrap  items-start">
          <div className="flex flex-col items-start justify-start ">
            <div className=" flex  w-full ">
              <p>Mobile :</p>
              <a
                href={`tel:${item.mobile}`}
                className="break-all text-sm text-info"
              >
                {item.mobile || "N/A"}
              </a>
            </div>
          </div>
        </div>
        <div className="card-actions p-0  w-full flex-wrap  items-end">
          <td className="py-3 px-4 text-center flex justify-center items-center gap-4 break-all">
            <button
              onClick={() => {
                setSelectedStaff(item);
                setEditForm({ ...item, file: null });
                setShowEditModal(true);
              }}
              className="btn btn-sm z-10 btn-warning rounded-lg"
            >
              <HiPencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setSelectedStaff(item);
                setShowDeleteModal(true);
              }}
              className="btn btn-sm z-10 btn-error rounded-lg"
            >
              <HiTrash className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setSelectedStaff(item);
                setShowRemoveImageModal(true);
              }}
              className="btn btn-sm z-10 btn-info rounded-lg"
            >
              <MdImageNotSupported className="w-5 h-5" />
            </button>
          </td>
        </div>
      </div>
    </div>
  );

  if (loading) return <Loading />;
  if (error) return <Errors error={error} />;

  return (
    <>
      {/* Delete Confirmation Modal */}
      {showRemoveImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to remove this image?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRemoveImageModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
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
            <p className="mb-6">Are you sure you want to delete this staff?</p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 items-center justify-center p-4 overflow-auto">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Add New Staff</h3>
            {/* Responsive grid: one column on xs, two on sm+ */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {["name", "email", "mobile"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={uploadForm[field]}
                    onChange={(e) =>
                      setUploadForm({ ...uploadForm, [field]: e.target.value })
                    }
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                IMAGE (profile picture)
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, file: e.target.files[0] })
                }
                accept="image/*"
              />
            </div>
            <div className="flex flex-row sm:flex-row justify-end gap-3 mt-6">
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
      {showEditModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 items-center justify-center p-4 overflow-auto">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Edit Staff</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {["name", "email", "mobile"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={editForm[field]}
                    onChange={(e) =>
                      setEditForm({ ...editForm, [field]: e.target.value })
                    }
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                IMAGE
                {selectedStaff.image && (
                  <div className="text-red-500 border border-gray-300 p-2 flex rounded-md w-full flex-wrap overflow-hidden mt-2">
                    <p className="text-xs w-full">
                      <a href={selectedStaff.image}>
                        <img
                          src={selectedStaff.image}
                          alt="image"
                          className="w-full h-auto"
                          width={100}
                          height={100}
                        />
                      </a>
                    </p>
                  </div>
                )}
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={(e) =>
                  setEditForm({ ...editForm, file: e.target.files[0] })
                }
                accept="image/*"
              />
            </div>
            <div className="flex flex-row md:flex-row justify-end gap-3 mt-6">
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

      <MainCard title="Staff">
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
                    Add New
                  </button>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto rounded-lg border">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          IMAGE
                        </th>

                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Name
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Email
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Phone
                        </th>

                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentRows.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-center text-gray-900">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-60 h-60 rounded-md object-cover border-2 border-teal-600 border-dashed break-all"
                            />
                          </td>
                          <td className="py-3 px-4 text-gray-900 break-all">
                            {item.name}
                          </td>
                          <td className="py-3 px-4 text-gray-900 break-all">
                            {item.email}
                          </td>
                          <td className="py-3 px-4 text-gray-900 break-all">
                            {item.mobile || "N/A"}
                          </td>

                          <td className="py-3 px-4 text-center flex justify-center items-center gap-4 break-all">
                            <button
                              onClick={() => {
                                setSelectedStaff(item);
                                setEditForm({ ...item, file: null });
                                setShowEditModal(true);
                              }}
                              className="btn btn-sm z-10 btn-warning rounded-lg"
                            >
                              <HiPencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedStaff(item);
                                setShowDeleteModal(true);
                              }}
                              className="btn btn-sm z-10 btn-error rounded-lg"
                            >
                              <HiTrash className="w-5 h-5" />
                            </button>

                            <button
                              onClick={() => {
                                setSelectedStaff(item);
                                setShowRemoveImageModal(true);
                              }}
                              className="btn btn-sm z-10 btn-info rounded-lg"
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
                <div className="md:hidden space-y-3">
                  {currentRows.map((item, index) => (
                    <MobileCard key={index} item={item} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstRow + 1} to{" "}
                    {Math.min(indexOfLastRow, filteredStaffs.length)} of{" "}
                    {filteredStaffs.length} entries
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

export default Staffs;
