import React, { useState, useEffect, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import MainCard from "../Activites/MainCard";
import { fetchMainData, deleteMainImage } from "../../Features/MainImages";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ImageCard from "../Activites/ImageCard";
import { HiPencil, HiTrash } from "react-icons/hi";

const MainImageSlide = () => {
  const dispatch = useDispatch();
  const { imageSlider, loading, error } = useSelector(
    (state) => state.MainImagesData
  );
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [file, setFile] = useState(null);
  const [editFile, setEditFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchMainData());
  }, [dispatch]);

  // Handle image upload
  const handleImageUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
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
      const response = await axios.post(
        "http://localhost:4000/api/uplaodMainImages",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.message) {
        dispatch(fetchMainData());
        toast.success("Image uploaded successfully!");
        setFile(null);
      }
      toast.dismiss(loadingToast);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Upload failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e, id) => {
    setUpdating(true);
    e.preventDefault();
    if (!editFile) return toast.error("Please select a file");
    const MAX_SIZE_MB = 5;
    if (!editFile.type.startsWith("image/")) {
      setEditFile(null);
      return toast.error("Please upload an image file (JPEG, PNG, etc.)");
    }
    if (editFile.size > MAX_SIZE_MB * 1024 * 1024) {
      setEditFile(null);
      return toast.error(`File size exceeds ${MAX_SIZE_MB}MB limit`);
    }

    const formData = new FormData();
    formData.append("image", editFile);

    try {
      setUpdating(true);
      const loadingToast = toast.loading("Updating image...");
      const response = await axios.put(
        `http://localhost:4000/api/updateMainImage/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.message) {
        dispatch(fetchMainData());
        toast.success("Image updated successfully!");
        setEditFile(null);
      }
      toast.dismiss(loadingToast);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Upload failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  // Handle image deletion
  const handleDelete = async (id) => {
    console.log(id);
    try {
      setDeleting(true);
      const loadingToast = toast.loading("Deleting image...");
      const res = await axios.delete(
        `http://localhost:4000/api/deleteMainImages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data) {
        toast.success("Image deleted successfully!");
        await dispatch(fetchMainData());
        setDeleting(false);
      } else {
        toast.error(res.error || "Delete failed.");
        await dispatch(fetchMainData());
        setDeleting(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Delete failed.");
      await dispatch(fetchMainData());
      setDeleting(false);
    }
  };

  // Filter data based on search term
  const filteredPublications = imageSlider.filter((pub) =>
    Object.values(pub).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPublications.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const totalPages = Math.ceil(filteredPublications.length / rowsPerPage);

  return (
    <MainCard title={"Main Image Slide"}>
      <div className="min-h-auto flex m-0 pt-3">
        <div className="mt-6 bg-white rounded-lg shadow-md w-full">
          <div className="space-y-4 p-4">
            {/* Search and Upload Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
              <div className="w-full sm:w-96 relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Search "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <div className="w-full sm:w-96 relative">
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
                  {[6, 9, 12, 24, 50, filteredPublications.length].map(
                    (value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Content Section */}
            {loading ? (
              <div className="text-center py-8">Loading images...</div>
            ) : error ? (
              <div className="text-red-500 text-center py-8">{error}</div>
            ) : (
              <>
                {/* Image Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentRows.map((pub) => (
                    <div className="card card-compact bg-base-100 shadow-xl transition duration-300 hover:shadow-2xl hover:scale-105 hover:cursor-pointer hover:shadow-blue-500">
                      <figure className="">
                        <img
                          className="w-100 h-48 object-cover"
                          src={pub.image}
                          alt={pub._id}
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title ">
                          Upload date : {pub.createdAt}
                        </h2>
                        <h1 className="card-title ">
                          updated at : {pub.updatedAt}
                        </h1>
                        <p>{pub.description}</p>

                        <div className="card-actions justify-end">
                          <div className="w-full flex justify-between ">
                            <div className="">
                              <form
                                onSubmit={(e) => handleUpdate(pub._id)}
                                className="mt-4"
                              >
                                <input
                                  type="file"
                                  className="file-input file-input-bordered file-input-info w-full "
                                  onChange={(e) =>
                                    setEditFile(e.target.files[0])
                                  }
                                  accept="image/*" // Browser-level image filter
                                />

                                <button
                                  type="submit"
                                  className="btn btn-info mt-2"
                                  disabled={editFile === null || updating}
                                >
                                  {updating ? "Updateing..." : "Update Image"}
                                </button>
                              </form>
                            </div>
                          </div>
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleDelete(pub._id)}
                          >
                            <HiTrash className="mr-2" size={20} />
                            Delete
                          </button>
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
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
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
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
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
