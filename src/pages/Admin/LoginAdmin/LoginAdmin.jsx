import React, { useState } from 'react';
import {LoginForm} from '../../../components/Admin';
import "./LoginAdmin.scss";


export const LoginAdmin = () => {
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState('Log in');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (working) return;
    setWorking(true);
    setMessage('Authenticating');
    setTimeout(() => {
      setMessage('Welcome back!');
      setTimeout(() => {
        setMessage('Log in');
        setWorking(false);
      }, 4000);
    }, 3000);
  };


  return (
    <div className='login-admin'>
        <div className="wrapper">
          <LoginForm/>
        </div>
    </div>    
  );
  
}


/*   return (
    <>
        <div className='login-admin'>
          <div className="login-admin__content">
            <h1>Entrar al panel</h1>
            <LoginForm/>
            
          </div>
        </div>
    </>
  ) */