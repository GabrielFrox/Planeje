import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import UserInfoBar from '../components/UserInfoBar';

export default function Disciplines() {
  const location = useLocation();
  const navigate = useNavigate();

  const errorHandler = (error) => {
    notify(error, 'error');
    setTimeout(() => {
      navigate('/')
    }, 3000);
  }

  const notify = (msg, type) => toast(msg, {
    type: type,
    position: "top-center",
    autoClose: 1500,
    pauseOnHover: false,
    theme: "dark",
  });

  return (
    <div>
      <NavigationBar location={ location.pathname }/>
      <UserInfoBar errorHandler={ errorHandler }/>
      <h1>Disciplinas</h1>
      <ToastContainer />
    </div>
  )
};
