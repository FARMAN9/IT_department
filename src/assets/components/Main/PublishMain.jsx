import React, { useState } from 'react';

const PublicationsTable = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const publications = [
    {
      name: 'Security and Privacy, Wiley',
      authorsTitle: 'Ravi Kumar, Samayveer Singh, Deepti Singh, Mohit Kumar, Sukhpal Singh Gill "A robust and secure user authentication scheme based on multifactor and multi-gateway in IoT enabled sensor networks"',
      year: 2024,
      link: '#'
    },
    {
      name: 'Multimedia Tools and Applications, SCI [IF=3.6]',
      authorsTitle: 'Mohit Kumar, Atul Rai, Surbhit, Neeraj Kumar "Autonomic edge cloud-assisted framework for heart disease prediction using RF-LRG algorithm"',
      year: 2024,
      link: '#'
    },
    {
      name: 'IEEE Transactions on Sustainable Computing, 2024, (IEEE IF = 2.456)',
      authorsTitle: 'Mohit Kumar, Avadh Kishor, P K Singh and Kalka Dubey "Deadline-aware Cost and Energy Efficient Offloading in Mobile Edge Computing"',
      year: 2024,
      link: '#'
    },
    {
      name: 'Computers in Human Behavior, Elsevier (SCI IF=9.0)',
      authorsTitle: 'Mansi Gupta, Mohit Kumar and Yash Gupta, "A Blockchain-Empowered Federated Learning-based Framework for Data Privacy in Lung Disease Detection System"',
      year: 2024,
      link: '#'
    },
    {
      name: 'IEEE Transaction of Consumer Electronics (IEEE IF=4.3)',
      authorsTitle: 'Prabal Verma, Mohit Kumar, S S Gill and Wu Huaming, "Data Driven Stochastic Game Network-based Smart Home Monitoring System using IoT-enabled Edge Computing Environments"',
      year: 2024,
      link: '#'
    }
  ];

  const filteredPublications = publications.filter(pub =>
    pub.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPublications.slice(indexOfFirstRow, indexOfLastRow);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPublications.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 border border-teal-600 rounded-xl mb-6">Faculty</h2>
      <div className="flex flex-wrap -mx-4"></div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="px-4 py-3 flex justify-between items-center">
          <div>
            <input
              type="text"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="rows-per-page" className="mr-2">Rows per page:</label>
            <select
              id="rows-per-page"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700 font-bold">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Author + Title</th>
                <th className="py-3 px-4 text-center">Year</th>
                <th className="py-3 px-4 text-center">Link</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((pub, index) => (
                <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className="py-3 px-4 text-gray-800">{pub.name}</td>
                  <td className="py-3 px-4 text-gray-800">{pub.authorsTitle}</td>
                  <td className="py-3 px-4 text-center text-gray-800">{pub.year}</td>
                  <td className="py-3 px-4 text-center">
                    <a href={pub.link} className="text-blue-500 hover:text-blue-700">
                      Link
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 flex justify-end">
          <nav>
            <ul className="flex">
              {pageNumbers.map((pageNumber) => (
                <li
                  key={pageNumber}
                  className={`px-3 py-2 border rounded-md ${
                    pageNumber === currentPage
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      </div>
      
  );
};

export default PublicationsTable;



