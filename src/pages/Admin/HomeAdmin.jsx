import React from 'react';
import { Button } from 'antd'; // Import Button component from Ant Design
import { useAuth } from '../../hooks'; // Assume useAuth hook provides logout functionality

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
    <div>
      <h1>Home</h1>
      
      <Button onClick={handleLogout} type="primary">Logout</Button> // Primary button for a prominent action
    </div>
   </>    
  );
};