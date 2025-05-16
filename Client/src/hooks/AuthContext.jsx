import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!authToken);
  const navigate = useNavigate();

  const login = (token) => {
    setAuthToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  // Check for authToken on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
    } else {
      setAuthToken(null);
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        isLoggedIn,
        login,
        logout,
        setAuthToken,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
