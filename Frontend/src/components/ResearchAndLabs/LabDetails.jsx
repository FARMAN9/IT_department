import React from "react";
import { useParams, useLocation } from "react-router-dom";
import MainCard from "../Activites/MainCard";
import {
  FaMapMarkerAlt,
  FaFileAlt,
  FaFlask,
  FaDownload,
  FaImage,
} from "react-icons/fa";

const LabDetails = () => {
  const { id } = useParams();
  const data = useLocation();
  const { name, image, description, location, lab_manual, updatedAt, _id, Incharge } = data.state;

  return (
    <MainCard title={name}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Section */}
        <div className="mb-10 md:mb-12 lg:mb-16">
          <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-2xl shadow-xl">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-48 md:h-64 lg:h-96 object-contain object-center"
              />
            ) : (
              <div className="w-full h-48 md:h-64 lg:h-96 bg-gray-100 flex items-center justify-center">
                <FaImage className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-10 md:mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-4 md:gap-6 bg-white px-8 py-4 rounded-full shadow-lg">
            <FaFlask className="text-3xl md:text-4xl text-teal-600" />
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 capitalize">
              {name}
            </h1>
          </div>
          {Incharge && (
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              Lab Incharge: {Incharge}
            </p>
          )}
        </div>

        {/* Description Section */}
        <section className="mb-12 md:mb-14 lg:mb-16">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
            Description
          </h2>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
            <p className="text-gray-600 leading-relaxed md:leading-loose whitespace-pre-wrap text-sm md:text-base">
              {description || "No description available"}
            </p>
          </div>
        </section>

        {/* Lab Manual Section */}
        {lab_manual && (
          <section className="mb-12 md:mb-14 lg:mb-16">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <FaFileAlt className="text-blue-500" />
              Lab Manual & Documentation
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 md:p-8 rounded-xl shadow-md border border-blue-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-2">
                    
                  </h3>
                  <div className="space-y-1">
                    <p className="text-gray-600 text-sm md:text-base">
                      Last updated: {new Date(updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <a
                  href={lab_manual}
                  download
                  className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  <FaDownload className="flex-shrink-0" />
                  <span>Download Manual</span>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Location Section */}
        {location && (
          <section className="mb-12 md:mb-14 lg:mb-16">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-500" />
              Location
            </h2>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
              <p className="text-gray-600 text-sm md:text-base">
                {location}
              </p>
            </div>
          </section>
        )}
      </div>
    </MainCard>
  );
};

export default LabDetails;