import React from 'react';
import FacultyCard from '../Facultycard/FaclutyCard';

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


<>

    <div className="min-h-auto flex lg:mr-10">
    <main className="flex-1 lg:ml-10 p-2 lg:p-4">
      <div className="max-w-6xl mx-auto p-0 pt-4 space-y-8">
        
        {/* Coordinator Section */}
        <div className="relative">
          <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-5 py-2 rounded-full text-xl font-bold shadow-lg">
            Coordinator
          </div>
          <div className="mt-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-600">
            <div className="bg-white shadow-md rounded-lg">
            <div className="flex flex-wrap -mx-4">
        {facultyData.map((faculty, index) => (
          <FacultyCard
            key={index}
            image={faculty.image}
            name={faculty.name}
            designation={faculty.designation}
            email={faculty.email}
          />
        ))}
      </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
    </>
  );
};

export default FacultyList;
