import React, { useState, useEffect, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import MainCard from "../Activites/MainCard";
import { fetchMainData } from "../../Features/MainImages";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { HiPencil, HiTrash } from "react-icons/hi";
import Loading from "../UtilityCompoments/Loading";
import Errors from "../UtilityCompoments/Errors";
import Cookies from "js-cookie";

const MainImageSlide = () => {
  const dispatch = useDispatch();
  const { imageSlider, loading, error } = useSelector(
    (state) => state.MainImagesData
  );
  const token = Cookies.get("token");
  console.log("token", token);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateFile, setUpdateFile] = useState(null);

  useEffect(() => {
    dispatch(fetchMainData());
  }, [dispatch]);

  // Common error handler
  const handleApiError = (err, action) => {
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      `${action} failed. Please try again.`;
    toast.error(errorMessage);
  };

  // Image upload handler
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file");

    const MAX_SIZE_MB = 5;
    if (!file.type.startsWith("image/")) {
      setFile(null);
      return toast.error("Please upload an image file (JPEG, PNG, etc.)");
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setFile(null);
      return toast.error(`File size exceeds ${MAX_SIZE_MB}MB limit`);
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const loadingToast = toast.loading("Uploading image...");

      await axios.post("http://localhost:4000/api/uploadMainImages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      await dispatch(fetchMainData());
      toast.success("Image uploaded successfully!");
      setFile(null);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "upload");
    } finally {
      setUploading(false);
    }
  };

  // Image update handler
  const handleUpdate = async () => {
    if (!updateFile) return toast.error("Please select a file");

    const MAX_SIZE_MB = 5;
    if (!updateFile.type.startsWith("image/")) {
      return toast.error("Please upload an image file (JPEG, PNG, etc.)");
    }
    if (updateFile.size > MAX_SIZE_MB * 1024 * 1024) {
      return toast.error(`File size exceeds ${MAX_SIZE_MB}MB limit`);
    }

    const formData = new FormData();
    formData.append("image", updateFile);

    try {
      setUpdating(true);
      const loadingToast = toast.loading("Updating image...");
      await axios.put(
        `http://localhost:4000/api/updateMainImages/${selectedImage._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchMainData());
      toast.success("Image updated successfully!");
      setShowUpdateModal(false);
      setUpdateFile(null);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "update");
    } finally {
      setUpdating(false);
    }
  };

  // Image deletion handler
  const handleDelete = async () => {
    try {
      const loadingToast = toast.loading("Deleting image...");

      await axios.delete(
        `http://localhost:4000/api/deleteMainImages/${selectedImage._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchMainData());
      toast.success("Image deleted successfully!");
      setShowDeleteModal(false);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "delete");
    }
  };

  // Memoized filtered data
  const filteredPublications = useMemo(
    () =>
      imageSlider.filter((pub) =>
        Object.values(pub).some((value) =>
          value.toString().toLowerCase().includes(search.toLowerCase())
        )
      ),
    [imageSlider, search]
  );

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPublications.slice(
    indexOfFirstRow,
    indexOfLastRow
  );
  const totalPages = Math.ceil(filteredPublications.length / rowsPerPage);

  return (
    <MainCard title={"Main Image Slide"}>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this image?</p>
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

      {/* Update Image Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Update Image</h3>
            <input
              type="file"
              className="file-input file-input-bordered w-full mb-4"
              onChange={(e) => setUpdateFile(e.target.files[0])}
              accept="image/*"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                  setUpdateFile(null);
                }}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="btn btn-primary"
                disabled={!updateFile || updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-auto flex m-0 pt-3">
        <div className="mt-6 bg-white rounded-lg shadow-md w-full">
          <div className="space-y-4 p-4">
            {/* Search and Upload Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
              <div className="w-full sm:w-96 relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

                <form onSubmit={handleImageUpload} className="mt-4">
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-info w-full max-w-xs"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*"
                  />
                  <button
                    type="submit"
                    className="btn btn-info btn-sm mt-2"
                    disabled={!file || uploading}
                  >
                    {uploading ? "Uploading..." : "Upload Image"}
                  </button>
                </form>
              </div>

              {/* Rows Per Page Selector */}
              <div className="flex items-center">
                <label
                  htmlFor="rows-per-page"
                  className="mr-2 text-sm text-gray-600"
                >
                  Rows per page:
                </label>
                <select
                  id="rows-per-page"
                  className="border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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

            {/* Content Section */}
            {loading ? (
              <Loading />
            ) : error ? (
              <Errors error={error.error} />
            ) : (
              <>
                {/* Image Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentRows.map((pub) => (
                    <div
                      key={pub._id}
                      className="card card-compact bg-base-100 shadow-xl transition duration-300 hover:shadow-2xl hover:scale-105"
                    >
                      <figure className="relative">
                        <img
                          className="w-full h-48 object-cover"
                          src={pub.image}
                          alt={pub.description || "Uploaded image"}
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <button
                            className="btn btn-circle btn-sm btn-warning"
                            onClick={() => {
                              setSelectedImage(pub);
                              setShowUpdateModal(true);
                            }}
                          >
                            <HiPencil size={16} />
                          </button>
                          <button
                            className="btn btn-circle btn-sm btn-error"
                            onClick={() => {
                              setSelectedImage(pub);
                              setShowDeleteModal(true);
                            }}
                          >
                            <HiTrash size={16} />
                          </button>
                        </div>
                      </figure>
                      <div className="card-body">
                        <div className="text-sm space-y-1">
                          <p>
                            Uploaded:{" "}
                            {new Date(pub.createdAt).toLocaleDateString()}
                          </p>
                          <p>
                            Updated:{" "}
                            {new Date(pub.updatedAt).toLocaleDateString()}
                          </p>
                          {pub.description && <p>{pub.description}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstRow + 1} to{" "}
                    {Math.min(indexOfLastRow, filteredPublications.length)} of{" "}
                    {filteredPublications.length} entries
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="flex gap-1">
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

export default MainImageSlide;
