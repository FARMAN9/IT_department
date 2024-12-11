import React from 'react';
import  PdfViewer from '../studentsCard/studentCard'; // Import the FacultyCard

const FacultyList = () => {
  const facultyData = [
    {
      image: 'https://via.placeholder.com/100', // Replace with actual image URLs
      name: 'Dr Vijay Kumar',
      designation: 'Associate Professor & Head',
      email: 'vijayk@nitj.ac.in',
    },
    {
      image: 'https://via.placeholder.com/100',
      name: 'Dr Kusum Bharti',
      designation: 'Assistant Professor (Grade-I)',
      email: 'bhartik@nitj.ac.in',
    },
    {
      image: 'https://via.placeholder.com/100',
      name: 'Dr Mohit Kumar',
      designation: 'Assistant Professor (Grade-I)',
      email: 'kumarmohit@nitj.ac.in',
    },
    {
      image: 'https://via.placeholder.com/100',
      name: 'Dr Nisha Chaurasia',
      designation: 'Assistant Professor (Grade-I)',
      email: 'chaurasian@nitj.ac.in',
    },
    {
      image: 'https://via.placeholder.com/100',
      name: 'Dr Nisha Chaurasia',
      designation: 'Assistant Professor (Grade-I)',
      email: 'chaurasian@nitj.ac.in',
    },
  
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 border border-teal-600 rounder-xl mb-6">Faculty</h2>
      <div className="flex flex-wrap -mx-4">
        {facultyData.map((faculty, index) => (
          <  PdfViewer
             pdfUrl={`https://drive.google.com/file/d/1Y5d5YR2lQ5J7yBwM6D7X9Q6WbNk5L6oE/view?usp=share_link`}
           
          />
        ))}
      </div>
    </div>
  );
};

export default FacultyList;