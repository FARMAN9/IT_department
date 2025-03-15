import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data (null if not logged in)

  const login = (userData) => {
    setUser(userData); // Save user data when logged in
    console.log("login user", userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Store in localStorage
  };

  const logout = () => {
    setUser(null);
    console.log("logout user");
    localStorage.removeItem("user");
    Cookies.remove("Uid");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
