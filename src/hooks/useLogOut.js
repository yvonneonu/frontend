import React from "react";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../services/authService";

const useLogOut = () => {
  const navigate = useNavigate();
  const logOut = () => {
    logOutUser();
    navigate("/login");
  };
  return logOut;
};

export default useLogOut;
