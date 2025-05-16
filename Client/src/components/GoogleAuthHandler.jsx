// src/components/GoogleAuthHandler.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GoogleAuthHandler;
