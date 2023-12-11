import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "./hook/useToken";


const Logout = () => {
  const [ token, saveToken, removeToken ] = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    removeToken();
    navigate("/login");
    window.location.reload();
  }, []);


  return (
    <div>
      <h1>Logout Success</h1>
    </div>
  );
}

export default Logout;