import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainDepartmentData } from "../../../Features/MainDepartmentSlice";
import { HiPencil, HiTrash, HiUpload } from "react-icons/hi";
import toast from "react-hot-toast";
import axios from "axios";
import MainCard from "../../Activites/MainCard";

function Main() {
  document.title = "Department Information";
  const dispatch = useDispatch();
  const { MainDepartmentInfo, loading, error } = useSelector(
    (state) => state.MainDepartmentData
  );

  const [image, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    phoneNumber: "",
    city: "",
    state: "",
    pinCode: "",
    description: "",
    imageUrl: "",
    youtubeLink: "",
  });
  const [updateFile, setUpdateFile] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch department data on mount
  useEffect(() => {
    dispatch(fetchMainDepartmentData());
  }, [dispatch]);

  const handleApiError = (err, action) => {
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      `${action} failed. Please try again.`;
    toast.error(errorMessage);
  };

  // Update form state when MainDepartmentInfo is loaded
  useEffect(() => {
    if (MainDepartmentInfo) {
      setImage(MainDepartmentInfo.image);
      setFormData({
        name: MainDepartmentInfo.name || "",
        officeMail: MainDepartmentInfo.officeMail || "",
        phoneNumber: MainDepartmentInfo.phoneNumber || "",
        city: MainDepartmentInfo.city || "",
        state: MainDepartmentInfo.state || "",
        pinCode: MainDepartmentInfo.pinCode || "",
        description: MainDepartmentInfo.description || "",
        imageUrl: MainDepartmentInfo.image || "",
        youtubeLink: MainDepartmentInfo.Youtube_Link || "",
      });
    }
  }, [MainDepartmentInfo]);

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
    try {
      const loadingToast = toast.loading("Updating Department Information...");
      await axios.put("http://localhost:4000/api/uplaodMainInfo", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await dispatch(fetchMainDepartmentData());
      toast.success("Department Information updated successfully!");
      setShowForm(false);
      toast.dismiss(loadingToast);
    } catch (err) {
      console.log(err);
      handleApiError(err, "update");
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdate = async () => {
    if (!updateFile) return toast.error("Please select a file");

    const MAX_SIZE_MB = 5;
    if (!updateFile.type.startsWith("image/")) {
      return toast.error("Please upload an image file (JPEG, PNG, etc.)");
    }
    if (updateFile.size > MAX_SIZE_MB * 1024 * 1024) {
      return toast.error(`File size exceeds ${MAX_SIZE_MB}MB limit`);
    }

    const updateFormData = new FormData();
    updateFormData.append("image", updateFile);

    try {
      setUpdating(true);
      const loadingToast = toast.loading("Updating image...");
      await axios.put(
        "http://localhost:4000/api/updateMainDepartmentImage",
        updateFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await dispatch(fetchMainDepartmentData());
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
      await axios.delete(
        "http://localhost:4000/api/deleteMainDepartmentImage",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await dispatch(fetchMainDepartmentData());
      toast.success("Image deleted successfully!");
      setShowDeleteModal(false);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "delete");
    }
  };

  return (
    <>
      <MainCard title="Department Information">
        <div className="flex flex-col lg:flex-row min-h-screen">
          <main className="flex-1 p-0 m-1">
            {/* Delete Confirmation Modal */}
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

            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-sm btn-warning rounded-lg"
              >
                <HiPencil size={24} /> Edit Department Information
              </button>
            </div>

            {/* Update Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                  <h2 className="text-2xl font-bold mb-4">
                    Edit Department Information
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
                          name="officeMail"
                          value={formData.officeMail}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          <div
                            className="lg:tooltip"
                            data-tip="Tip: You can add multiple phone numbers by separating them with a comma. For example: 1234567890, 1234567891 📞"
                          >
                            <p className="">Phone Number</p>
                          </div>
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
                    {/* Fields for City and State */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Pin Code
                        </label>
                        <input
                          type="text"
                          name="pinCode"
                          value={formData.pinCode}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          <div
                            className="lg:tooltip"
                            data-tip="Tip: To extract a YouTube video link from an embed code, copy only the URL inside the src attribute.
For example, given:
<iframe src='https://www.youtube.com/embed/X5-8GItQa0Q'></iframe>
the correct link is:
https://www.youtube.com/embed/X5-8GItQa0Q

Note: Only valid YouTube embed links work. Other formats or extra characters may cause issues. 🎥✅"
                          >
                            <p className=""> Youtube Link</p>
                          </div>
                        </label>
                        <input
                          type="text"
                          name="youtubeLink"
                          value={formData.youtubeLink}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
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

            {/* Display Existing Information */}
            {MainDepartmentInfo && (
              <div className="flex justify-center items-center  max-w-full">
                <div className="w-full">
                  {/* Image Section */}
                  <div className="mb-8">
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <div className="w-full  h-96  relative">
                        <div
                          className="absolute inset-0  rounded-lg shadow-lg overflow-hidden"
                          style={{
                            transform: "perspective(1000px) rotateY(0deg)",
                          }}
                        >
                          <img
                            src={MainDepartmentInfo.image}
                            alt="Department Head"
                            className="w-full h-full rounded-lg shadow-lg"
                          />
                        </div>
                        <div className="mt-4 flex justify-end gap-4">
                          <button
                            className="btn btn-sm z-10 btn-warning rounded-lg"
                            onClick={() => setShowUpdateModal(true)}
                          >
                            <HiPencil size={16} />
                          </button>
                          <button
                            className="btn btn-sm z-10 btn-error rounded-lg"
                            onClick={() => setShowDeleteModal(true)}
                          >
                            <HiTrash size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <div className="w-full  h-96  relative">
                        <div
                          className="absolute inset-0  rounded-lg shadow-lg overflow-hidden"
                          style={{
                            transform: "perspective(1000px) rotateY(0deg)",
                          }}
                        >
                          <figure className="h-[100%] w-[100%]">
                            <iframe
                              className=" h-full w-full object-cover"
                              src={MainDepartmentInfo.Youtube_Link}
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="mb-8 bg-gray-100 p-6 rounded-lg border border-gray-300">
                    <h2 className="text-2xl font-bold mb-4">
                      {MainDepartmentInfo.name}
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-justify">
                      {MainDepartmentInfo.description}
                    </p>
                  </div>

                  {/* Department Information */}
                  <div className="w-full">
                    <div className="mb-4">
                      <div className="mt-2 bg-gray-100 p-4 border border-gray-300 rounded">
                        <p className="font-semibold">Address</p>
                        <p>
                          Department of Information Technology
                          <br />
                          {MainDepartmentInfo.name}
                          <br />
                          {MainDepartmentInfo.city}
                          <br />
                          {MainDepartmentInfo.state},{" "}
                          {MainDepartmentInfo.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="flex-col lg:flex xl:flex 2xl:flex justify-between gap-2">
                      <div className="mb-4 bg-gray-100 p-4 border border-gray-300 rounded">
                        <p className="font-semibold">Office Email</p>
                        <a
                          href={`mailto:${MainDepartmentInfo.officeMail}`}
                          className="text-blue-500 underline hover:text-blue-700"
                        >
                          {MainDepartmentInfo.officeMail}
                        </a>
                      </div>
                      <div className="mb-4 bg-gray-100 p-4 border border-gray-300 rounded">
                        <p className="font-semibold">Phone</p>
                        <a
                          href={`tel:${MainDepartmentInfo.phoneNumber}`}
                          className="text-blue-500 underline hover:text-blue-700"
                        >
                          {MainDepartmentInfo.phoneNumber}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </MainCard>
    </>
  );
}

export default Main;
