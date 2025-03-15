import React,{useState,useEffect} from 'react';
import MainCard from '../../Activites/MainCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';


function Dashboard() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                // Check if user exists in localStorage
                const storedUser = JSON.parse(localStorage.getItem("user"));
                const token = Cookies.get("Uid");
                
                if (!storedUser?._id || !token) {
                    console.error("Missing user ID or token");
                    return;
                }
    
                const response = await axios.get(
                    `http://localhost:4000/api/currentUser/${storedUser._id}`,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                
                setCurrentUser(response.data.data[0]);
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error(error.message);
                

              
            }
        };
    
        fetchCurrentUser();
    }, []); // Empty dependency array to run only on mount
    
    // Optional: Add loading state
    console.log(currentUser);
  

  return (

    <MainCard title={`Welcome ${currentUser?.name} to Dashboard`}>
      <div className="mb-8">
        {/* Stats Cards */}
        <div className="bg-white  rounded-lg shadow-sm border border-gray-100  gap-1">
        <div className="card card-side bg-base-100 shadow-md ">
  <figure>
    <img className='lg:w-96 lg:h-96 w-30 h-30 object-containrounded-md bg-gray-100 '
      src={currentUser?.image}
      alt={currentUser?.name} />
  </figure>
  <div className="card-body p-3 gap-2">
    <h2 className="card-title text-md sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">{currentUser?.name}</h2>
     <p className="text-md sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">designation
     : <a href="mailto:jon@example.com">{currentUser?.designation}</a></p>
   
    <div className="card-actions justify-end  ">
        <div className="flex flex-row lg:flex-col gap-2 lg:gap-4">
            <button className="btn btn-sm  btn-warning text-white rounded-full lg:w-full">Edit</button>
            <button className="btn btn-sm  btn-primary rounded-full lg:w-full">Watch</button>
            <button className="btn btn-sm  bg-red-500 text-white hover:bg-red-600 rounded-full lg:w-full">Logout</button>
        </div>
    </div>
  </div>
</div>
 </div>
        
        <div className="flex flex-grow gap-1 p-2">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 ">
          <h3 className="text-gray-500 text-sm font-medium">Active Projects</h3>
          <p className="text-2xl font-bold mt-2">42</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Completed Tasks</h3>
          <p className="text-2xl font-bold mt-2">89</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
          <p className="text-2xl font-bold mt-2">$12,345</p>
        </div>
      </div> 
      </div>
     

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
        <ul className="space-y-4">
          <li className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>New user registration</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </li>
          <li className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>Project "Alpha" updated</span>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </li>
          <li className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>Meeting with client</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </li>
        </ul>
      </div>
    </MainCard>
  );
}

export default Dashboard;