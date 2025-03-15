import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";


const checkTokenValidity = async () => {
  const token = Cookies.get("Uid"); // Get token from cookies
  if (!token) {
    console.log("No token found");
    return false; // No token available
  }

  try {
    const response = await axios.post(
      "http://localhost:4000/api/validateToken", // Backend API
      { token }, // Send token as JSON
      { headers: { "Content-Type": "application/json" } }
    );

    console.log(response.data);
    return response.data.success; // true if valid
  } catch (error) {
    console.error("Token validation failed:", error.response?.data?.message);
    return false;
  }
};








const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();
  const storeLocalUser = JSON.parse(localStorage.getItem("user") || "{}"); // Prevents JSON.parse error
  
  


  const isTokenValid =  checkTokenValidity();
  if (!isTokenValid) {
    console.log("Token is invalid");
    Cookies.remove("Uid"); // Remove token from cookies
    localStorage.removeItem("user"); // Remove user from localStorage
    return <Navigate to="/" replace />; // Redirect if token is invalid
  }
  


  const currentUser = user || storeLocalUser; // Use context first, fallback to localStorage

  if (!currentUser?.role) {
    return <Navigate to="/" replace />; // Redirect if not logged in
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/" replace />; // Redirect if user lacks the required role
  }

  return children; // Render the protected page
};

export default ProtectedRoute;

