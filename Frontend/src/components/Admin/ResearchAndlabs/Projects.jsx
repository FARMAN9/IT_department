import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../Features/ProjectsSlice";
import {
  HiChevronLeft,
  HiChevronRight,
  HiSearch,
  HiPencil,
  HiTrash,
} from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import MainCard from "../../Activites/MainCard";
import Loading from "../../UtilityCompoments/Loading";
import Errors from "../../UtilityCompoments/Errors";

function Projects() {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector(
    (state) => state.ProjectsData
  );

  // State Management
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Form States
  const [uploadForm, setUploadForm] = useState({
    title: "",
    year_of_sanction: "",
    funding_agency: "",
    sanction_amount: "",
    link: "",
  });
  const [editForm, setEditForm] = useState({
    title: "",
    year_of_sanction: "",
    funding_agency: "",
    sanction_amount: "",
    link: "",
  });

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleApiError = (err, action) => {
    const errorMessage =
      err.response?.error || err.error || `${action} failed. Please try again.`;
    toast.error(errorMessage);
  };

  // Upload Handler
  const handleUpload = async () => {
    if (!uploadForm.title) return toast.error("Title is required");
    if (!uploadForm.year_of_sanction) return toast.error("Year is required");
    if (!uploadForm.funding_agency) return toast.error("Agency is required");
    if (!uploadForm.sanction_amount) return toast.error("Amount is required");

    try {
      const loadingToast = toast.loading("Uploading project...");
      await axios.post("http://localhost:4000/api/uploadProjects", uploadForm, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      await dispatch(fetchProjects());
      toast.success("Project uploaded successfully!");
      setShowUploadModal(false);
      setUploadForm({
        title: "",
        year_of_sanction: "",
        funding_agency: "",
        sanction_amount: "",
        link: "",
      });
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "Upload");
    }
  };

  // Update Handler
  const handleUpdate = async () => {
    try {
      const loadingToast = toast.loading("Updating project...");
      await axios.put(
        `http://localhost:4000/api/updateProjects/${selectedProject._id}`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchProjects());
      toast.success("Project updated successfully!");
      setShowEditModal(false);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "Update");
    }
  };

  // Delete Handler
  const handleDelete = async () => {
    try {
      const loadingToast = toast.loading("Deleting project...");
      await axios.delete(
        `http://localhost:4000/api/deleteProjects/${selectedProject._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(fetchProjects());
      toast.success("Project deleted successfully!");
      setShowDeleteModal(false);
      setSelectedProject(null);
      toast.dismiss(loadingToast);
    } catch (err) {
      handleApiError(err, "Delete");
    }
  };

  // Search and Pagination
  const filteredProjects = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return projects.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, projects]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);
  const currentRows = filteredProjects.slice(indexOfFirstRow, indexOfLastRow);

  // Mobile Card Component
  const MobileCard = ({ item }) => (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <div className="text-sm space-y-2">
          <p>
            <strong>Year:</strong> {item.year_of_sanction || "N/A"}
          </p>
          <p>
            <strong>Agency:</strong> {item.funding_agency || "N/A"}
          </p>
          <p>
            <strong>Amount:</strong>{" "}
            {item.sanction_amount ? `${item.sanction_amount} L` : "N/A"}
          </p>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary"
            >
              View Details
            </a>
          )}
        </div>
        <div className="card-actions mt-4 justify-end">
          <button
            onClick={() => {
              setSelectedProject(item);
              setEditForm({ ...item });
              setShowEditModal(true);
            }}
            className="btn btn-sm btn-warning"
          >
            <HiPencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedProject(item);
              setShowDeleteModal(true);
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
            <h3 className="text-lg font-bold mb-4">Add New Project</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.title}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Year of Sanction
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.year_of_sanction}
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      year_of_sanction: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Funding Agency
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.funding_agency}
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      funding_agency: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Funding Amount (₹ in Lakh)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.sanction_amount}
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      sanction_amount: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project Link
                </label>
                <input
                  type="url"
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.link}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, link: e.target.value })
                  }
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

      {showEditModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Edit Project</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Year of Sanction
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={editForm.year_of_sanction}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      year_of_sanction: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Funding Agency
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={editForm.funding_agency}
                  onChange={(e) =>
                    setEditForm({ ...editForm, funding_agency: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Funding Amount (₹ in Lakh)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={editForm.sanction_amount}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      sanction_amount: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project Link
                </label>
                <input
                  type="url"
                  className="w-full p-2 border rounded-md"
                  value={editForm.link}
                  onChange={(e) =>
                    setEditForm({ ...editForm, link: e.target.value })
                  }
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

      <MainCard title="Projects">
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
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="btn btn-sm btn-warning rounded-lg"
                    >
                      <HiPencil className="w-5 h-5" />
                      Add New Project
                    </button>
                  </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto rounded-lg border">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Project Title
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Year
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Funding Agency
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                          Amount (₹ L)
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
                          <td className="py-3 px-4 font-medium text-wrap text-justify">
                            {item.title}
                          </td>
                          <td className="py-3 px-4 text-wrap text-justify">
                            {item.year_of_sanction}
                          </td>
                          <td className="py-3 px-4 text-wrap text-justify">
                            {item.funding_agency}
                          </td>
                          <td className="py-3 px-4">
                            {item.sanction_amount} L
                          </td>
                          <td className="py-3 px-4">
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-600 hover:underline"
                              >
                                View
                              </a>
                            )}
                          </td>
                          <td className="py-3 px-4 flex justify-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedProject(item);
                                setEditForm({ ...item });
                                setShowEditModal(true);
                              }}
                              className="btn btn-sm btn-warning"
                            >
                              <HiPencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProject(item);
                                setShowDeleteModal(true);
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
                    {Math.min(indexOfLastRow, filteredProjects.length)} of{" "}
                    {filteredProjects.length} entries
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

export default Projects;
