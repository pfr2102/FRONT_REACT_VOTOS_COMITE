import React from "react";
import { useAuth } from "../../hooks"; // Assume useAuth hook provides logout functionality
import "./HomeAdmin.scss";
import logo from "../../assets/LogoGob.png";
export const HomeAdmin = () => {
  const { logout } = useAuth(); // Access logout function from useAuth hook

  const handleLogout = () => {
    // Perform any necessary logout logic before triggering navigation
    logout();
    // Alternatively, you could navigate to a designated logout page:
    // window.location.href = '/logout'; // Replace with your actual logout route
  };

  return (
    <>
      <div className="HomeAdmin-container">
        <img src={logo} alt="" />
        {/*       <ReactPlayer url='https://www.youtube.com/watch?v=fe8R45JSnbw' playing controls/> */}
      </div>
    </>
  );
};
