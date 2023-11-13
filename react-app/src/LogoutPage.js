import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, []);


  return (
    <div>
      <h1>Logout Success</h1>
    </div>
  );
}

export default Logout;