import React, { useState } from "react";

const PDFViewer = ({ url = "", width = "100%", height = "600px" }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Function to get URL with specific page (if supported by PDF)
  const getPagedUrl = (inputUrl, page) => {
    // Ensure inputUrl is a string and handle potential undefined
    const safeUrl = inputUrl || "";

    // Check if URL already has query parameters
    const separator = safeUrl.indexOf("?") !== -1 ? "&" : "?";
    return safeUrl ? `${safeUrl}${separator}page=${page}` : "";
  };

  return (
    <div className="pdf-viewer w-full h-screen justify-center items-center rounded-lg">
      {url ? (
        <>
          <iframe
            src={getPagedUrl(url, currentPage)}
            width={width}
            height={height}
            className="w-full h-full border rounded-md"
            title="PDF Viewer"
          >
            <p>Your browser does not support iframes.</p>
          </iframe>
        </>
      ) : (
        <div className="text-center text-gray-500 p-4 ">
          No PDF URL provided
        </div>
      )}
    </div>
  );
};

export default React.memo(PDFViewer);
