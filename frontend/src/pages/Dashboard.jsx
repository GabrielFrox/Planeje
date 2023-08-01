import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../services/axios';
import UserInfoBar from '../components/UserInfoBar';
import Schedule from '../components/Schedule';

export default function Dashboard() {
  const INITIAL_STATE = {
    userData: undefined,
    updateData: undefined,
  };

  const [state, setState] = useState(INITIAL_STATE);
  const navigate = useNavigate();

  const notify = (msg, type) => toast(msg, {
    type: type,
    position: "top-center",
    autoClose: 1500,
    pauseOnHover: false,
    theme: "dark",
  });

  const errorHandler = (error) => {
    notify(error, 'error');
    setTimeout(() => {
      navigate('/')
    }, 3000);
  }

  // ComponentDidMount to fetch data about user and do specific validations
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      errorHandler('Token não encontrado, faça login novamente');
    }
    
    async function fetchUserData(token) {
      const userInfo = await getUserInfo(token);
      if (userInfo.status === 401) {
        errorHandler('Token inválido, faça login novamente');
      }

      setState({...state, userData: userInfo.data});
    }

    fetchUserData(token);
    
  // eslint-disable-next-line
  }, []);

  const dashboardContent = () => {
    return (
      <>
        <UserInfoBar  userData={ state.userData }/>
        <Schedule userData={ state.userData }/>
      </>
    );
  }

  return (
    <div>
      { state.userData ? dashboardContent() : <h3>Carregando...</h3> }
      <ToastContainer />
    </div>
  )
};
