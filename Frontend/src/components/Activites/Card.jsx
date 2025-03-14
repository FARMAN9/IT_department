import { useState, useEffect } from "react";
import newImg from "../../assets/new.png";
import { HiOutlineExternalLink } from "react-icons/hi";

const Card = ({ title, items }) => {
  const [isNew, setIsNew] = useState(false);

  // Check if item is new (within last 30 days)
  const checkIsNew = (date) => {
    const itemDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = currentDate - itemDate;
    return timeDifference < 30 * 24 * 60 * 60 * 1000;
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-2xl text-sm sm:text-base lg:text-lg font-semibold">
            {title}
          </h2>
        </div>

        <div className="max-h-[400px] overflow-y-auto w-full">
          <div className="scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100 pr-2">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No items available
              </p>
            ) : (
              <ul className="space-y-4">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="group flex items-center justify-between space-x-3 border-b border-gray-200 pb-4 last:border-b-0 hover:bg-gray-50 px-2 rounded-lg"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-blue-600 text-sm sm:text-base lg:text-md flex items-center space-x-2 transition-colors"
                      >
                        <span>{item.name}</span>
                        {item.link && (
                          <HiOutlineExternalLink className="w-4 h-4 inline-block" />
                        )}
                      </a>
                    </div>

                    {(item.createdAt || item.updatedAt) && (
                      <div className="flex items-center space-x-2">
                        {checkIsNew(item.updatedAt || item.createdAt) && (
                          <span className="inline-block animate-pulse bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            NEW
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          {new Date(
                            item.updatedAt || item.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
