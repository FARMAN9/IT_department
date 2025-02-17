import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHodData } from "../../../Features/HodSlice";
import { HiPencil, HiUpload, HiTrash } from "react-icons/hi";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

function Main() {
  document.title = "HOD Message";
  const dispatch = useDispatch();
  const { HodInfo, loading, error } = useSelector((state) => state.HodData);
  const [image, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    phoneNumber: "",
    HodMessage: "",
    imageUrl: "",
  });

  const [updateFile, setUpdateFile] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(fetchHodData());
  }, [dispatch]);

  const handleApiError = (err, action) => {
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      `${action} failed. Please try again.`;
    toast.error(errorMessage);
  };

  useEffect(() => {
    if (HodInfo) {
      setImage(HodInfo.image);
      setFormData({
        name: HodInfo.name || "",
        mail: HodInfo.officeMail || "",
        phoneNumber: HodInfo.phoneNumber || "",
        HodMessage: HodInfo.HodMessage || "",
        imageUrl: HodInfo.image || "",
      });
    }
  }, [HodInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "imageUrl") {
      setImage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    console.log(formData);
    try {
      const loadingToast = toast.loading("Updating Hod Information...");
      const response = await axios.put(
        "http://localhost:4000/api/uplaodHodInfo",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await dispatch(fetchHodData());
      toast.success("Hod Information updated successfully!");
      setShowForm(false);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "update");
    }
  };

  //----------------------------------------------------
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
      await axios.put(`http://localhost:4000/api//hodImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      await dispatch(fetchHodData());
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

  const handleDelete = async () => {
    try {
      const loadingToast = toast.loading("Deleting image...");

      await axios.delete(`http://localhost:4000/api/deleteHodImage/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      await dispatch(fetchHodData());
      toast.success("Image deleted successfully!");
      setShowDeleteModal(false);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "delete");
    }
  };

  // ... keep the existing loading and error states

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <main className="flex-1 lg:ml-10 p-0 m-1 lg:p-6">
          {/* Add Edit Button at the top */}

          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
                <p className="mb-6">
                  Are you sure you want to delete this image?
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

          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-sm btn-warning rounded-lg"
            >
              <HiPencil size={24} /> Edit HOD Information
            </button>
          </div>
          {/* Update Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">
                  Edit HOD Information
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="mail"
                        value={formData.mail}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Image URL
                      </label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      HOD Message
                    </label>
                    <textarea
                      name="HodMessage"
                      value={formData.HodMessage}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md h-32"
                      required
                    />
                  </div>

                  <div className="mt-6 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* Existing display content (keep all the original JSX below) */}
          {/* ... rest of your existing JSX content ... */}
          <>
            <div className="flex flex-col lg:flex-row min-h-screen">
              <main className="flex-1 lg:ml-10 p-0 m-1 lg:p-6">
                <div className=" mx-auto pt-4 space-y-8  bg-white">
                  {/* Profile Section */}
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center  lg:mt-0">
                    {/* Left side with image */}
                    <div className="w-64 h-64 relative">
                      <div
                        className="absolute inset-0 bg-white rounded-lg shadow-lg overflow-hidden"
                        style={{
                          transform: "perspective(1000px) rotateY(-10deg)",
                        }}
                      >
                        <img
                          src={HodInfo.image}
                          alt="Department Head"
                          className="w-full h-full object-fit "
                        />
                      </div>
                      <div
                        className="mt-4  flex justify-end items-left gap-4"
                        onClick={() => setShowUpdateModal(true)}
                      >
                        <button className="btn btn-sm  z-10 btn-warning rounded-lg">
                          <HiPencil size={16} />
                        </button>
                        <button
                          className="btn btn-sm  z-10 btn-error rounded-lg"
                          onClick={() => setShowDeleteModal(true)}
                        >
                          <HiTrash size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Right side with info */}
                    <div className="flex-grow">
                      <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        {HodInfo.name}
                      </h1>
                      <h2 className="text-xl text-gray-700 mb-6">
                        Head of Department
                      </h2>

                      {/* Green line separator */}
                      <div className="h-1 w-full bg-emerald-600 mb-6"></div>

                      {/* Contact details */}
                      <div className="space-y-3">
                        <div className="flex gap-4">
                          <span className="text-gray-600 w-20">Email</span>
                          <span className="text-gray-800">:</span>
                          <a
                            href={`mailto:${HodInfo.officeMail}`}
                            className="text-gray-800 hover:text-emerald-600"
                          >
                            {HodInfo.officeMail}
                          </a>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-gray-600 w-20">Tel No.</span>
                          <span className="text-gray-800">:</span>
                          <span className="text-gray-800">
                            {HodInfo.phoneNumber} (O){" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* HoD's Message Section */}
                  <div className="mt-12">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-gray-800">
                        HoD's Message
                      </h2>
                      {/* Green line separator */}
                      <div className="h-1 w-32 bg-emerald-600  mt-2"></div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg border-l-4 border-teal-600">
                      <div className="p-6">
                        <p className="text-gray-700 leading-relaxed">
                          {HodInfo.HodMessage || "No message available."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </>
        </main>
      </div>
    </>
  );
}

export default Main;
