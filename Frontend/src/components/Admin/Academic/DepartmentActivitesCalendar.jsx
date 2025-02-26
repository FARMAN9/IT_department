import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartmentActivitesCalenderData } from "../../../Features/DepartmentActivitesCalendarslice";
import { HiPencil, HiTrash } from "react-icons/hi";
import toast from "react-hot-toast";
import axios from "axios";
import MainCard from "../../Activites/MainCard";
import PDFViewer from "../../PDFViewer/PDFViewer";

function DepartmentActivitesCalendar() {
  document.title = "Department Activities Calendar";
  const dispatch = useDispatch();
  const { DepartmentActivitesCalender, loading, error } = useSelector(
    (state) => state.DepartmentActivitesCalenderData
  );
  console.log("DepartmentActivitesCalender", DepartmentActivitesCalender);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [pdfViewerKey, setPdfViewerKey] = useState(Date.now());

  const [uploadForm, setUploadForm] = useState({
    year: "",
    file: null,
  });

  useEffect(() => {
    dispatch(fetchDepartmentActivitesCalenderData());
  }, [dispatch]);

  const handleApiError = (err, action) => {
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      `${action} failed. Please try again.`;
    toast.error(errorMessage);
  };

  const handleUpdate = async () => {
    if (!uploadForm.file) return toast.error("Please select a PDF file");

    const MAX_SIZE_MB = 5;
    if (uploadForm.file.type !== "application/pdf") {
      return toast.error("Please upload a valid PDF file");
    }
    if (uploadForm.file.size > MAX_SIZE_MB * 1024 * 1024) {
      return toast.error(`File size exceeds ${MAX_SIZE_MB}MB limit`);
    }

    const formData = new FormData();
    formData.append("Year", uploadForm.year);
    formData.append("pdf", uploadForm.file);

    try {
      setUpdating(true);
      const loadingToast = toast.loading("Uploading calendar...");

      await axios.post(
        "http://localhost:4000/api/uploadActivitesCalender",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchDepartmentActivitesCalenderData());
      toast.success("Calendar updated successfully!");
      setShowUpdateModal(false);
      setUploadForm({ year: "", file: null });
      // Refresh PDF viewer when new file is uploaded
      setPdfViewerKey(Date.now());
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "update");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      const loadingToast = toast.loading("Deleting calendar...");
      await axios.delete("http://localhost:4000/api/deleteActivitesCalender", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Clear current PDF immediately

      dispatch(fetchDepartmentActivitesCalenderData());

      toast.success("Calendar deleted successfully!");
      setShowDeleteModal(false);
      // Force PDF viewer refresh
      setPdfViewerKey(Date.now());
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "delete");
    }
  };

  const pdf = useMemo(
    () => DepartmentActivitesCalender?.ActivitesCalender || null,
    [DepartmentActivitesCalender?.ActivitesCalender]
  );

  return (
    <MainCard title="Department Activities Calendar">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <main className="flex-1 p-0 m-1">
          {/* Delete Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
                <p className="mb-6">
                  Are you sure you want to delete the calendar?
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

          {/* Update Modal */}
          {showUpdateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h3 className="text-lg font-bold mb-4">Update Calendar</h3>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.year}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, year: e.target.value })
                  }
                />
                <input
                  type="file"
                  className="file-input file-input-bordered w-full mb-4 mt-2"
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, file: e.target.files[0] })
                  }
                  accept="application/pdf"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowUpdateModal(false);
                      setUploadForm({ year: "", file: null });
                    }}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="btn btn-primary"
                    disabled={!uploadForm.file || updating}
                  >
                    {updating ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end mb-4 gap-2">
            <button
              onClick={() => setShowUpdateModal(true)}
              className="btn btn-sm btn-warning rounded-lg"
            >
              <HiPencil size={24} />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="btn btn-sm btn-error rounded-lg"
              disabled={!pdf} // Disable when no PDF exists
            >
              <HiTrash size={24} />
            </button>
          </div>

          {/* PDF Viewer */}
          <div className="flex flex-col lg:flex-row min-h-screen">
            <main className="flex-1 p-0 m-2 lg:p-2">
              {pdf ? (
                <PDFViewer key={pdfViewerKey} url={pdf} />
              ) : (
                <div className="text-center p-8 text-gray-500">
                  No calendar available
                </div>
              )}
            </main>
          </div>
        </main>
      </div>
    </MainCard>
  );
}

export default DepartmentActivitesCalendar;
