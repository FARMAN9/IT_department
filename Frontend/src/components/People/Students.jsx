import React, { useState, useEffect } from "react";
import MainCard from "../Activites/MainCard";
import PDFViewer from "../PDFViewer/PDFViewer";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsData } from "../../Features/StudentsSlice";

function Students() {
  const [selectedBatch, setSelectedBatch] = useState(null);

  const dispatch = useDispatch();
  const { students, loading, error } = useSelector(
    (state) => state.StudentsData
  );

  useEffect(() => {
    dispatch(fetchStudentsData());
  }, [dispatch]);

  const handleBatchChange = (event) => {
    const selected = students.find((item) => item.Batch === event.target.value);
    setSelectedBatch(selected);
  };

  document.title = "Students";

  return (
    <MainCard title="Students">
      <div className="container mx-auto p-6">
        <div className="flex items-center mb-4">
          <label htmlFor="batch-select" className="mr-2 font-medium">
            Programme & Batch :
          </label>
          <select
            id="batch-select"
            value={selectedBatch?.Batch || ""}
            onChange={handleBatchChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Programme & Batch</option>
            {students.map((item) => (
              <option key={item.Batch} value={item.Batch}>
                Programme: {item.Programe} & Batch: {item.Batch}
              </option>
            ))}
          </select>
        </div>
        {selectedBatch && (
          <div className="border border-gray-300 rounded-lg shadow-md">
            <PDFViewer url={selectedBatch.Students} />
          </div>
        )}
      </div>
    </MainCard>
  );
}

export default Students;
