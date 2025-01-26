import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer = ({ pdfUrl }) => {
  const [batch, setBatch] = useState("2019");

  const handleBatchChange = (event) => {
    setBatch(event.target.value);
    // Update the `pdfUrl` for the selected batch, if applicable
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-4">
        <label className="mr-2 font-medium">Batch:</label>
        <select
          value={batch}
          onChange={handleBatchChange}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
      </div>
      <div className="border border-gray-300 rounded-lg shadow-md">
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js`}
        >
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      </div>
    </div>
  );
};

export default PdfViewer;
