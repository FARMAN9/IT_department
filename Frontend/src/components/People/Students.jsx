import React, { useState } from "react";
import MainCard from "../Activites/MainCard";
import PDFViewer from "../PDFViewer/PDFViewer";

function Students() {
  const data = [
    {
      batch: "2019",
      pdfUrl: "https://www.citycabs.org/",
    },
    {
      batch: "2020",
      pdfUrl: "https://example.com/pdf2020.pdf",
    },
    {
      batch: "2021",
      pdfUrl: "https://www.youtube.com/watch?v=viKowUwWtfc",
    },
    {
      batch: "2022",
      pdfUrl: "https://example.com/pdf2022.pdf",
    },
  ];

  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleBatchChange = (event) => {
    const selected = data.find((item) => item.batch === event.target.value);
    setSelectedBatch(selected);
  };

  document.title = "Students";

  return (
    <MainCard title="Students">
      <div className="container mx-auto p-6">
        <div className="flex items-center mb-4">
          <label htmlFor="batch-select" className="mr-2 font-medium">
            Batch:
          </label>
          <select
            id="batch-select"
            value={selectedBatch?.batch || ""}
            onChange={handleBatchChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Batch</option>
            {data.map((item) => (
              <option key={item.batch} value={item.batch}>
                {item.batch}
              </option>
            ))}
          </select>
        </div>
        {selectedBatch && (
          <div className="border border-gray-300 rounded-lg shadow-md">
            <PDFViewer url={selectedBatch.pdfUrl} />
          </div>
        )}
      </div>
    </MainCard>
  );
}

export default Students;
