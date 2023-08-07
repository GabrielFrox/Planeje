import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../services/axios';
import { updateUserInfo } from '../services/axios';
import UserInfoBar from '../components/UserInfoBar';
import Schedule from '../components/Schedule';

export default function Dashboard() {
  const INITIAL_STATE = {
    userData: undefined,
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

  
  // Passe trough props to Schedule component to receive the user update in schedules
  const scheduleHandler = async (obj) => {
    const token = localStorage.getItem('token');
    const day = Object.keys(obj)[0];
    const discipline = Object.values(obj)[0];

    const newDaySchedule = {
      [day]: state.userData.schedule[day].concat(discipline)
    };

    setState((curr) => {
      return {
        ...curr,
        userData: {
          ...curr.userData,
          schedule: {
            ...curr.userData.schedule,
            ...newDaySchedule
          }
        }
      }
    })

    const updateDB = await updateUserInfo({ token, content: newDaySchedule
    });

    console.log(updateDB);
  }

  const errorHandler = (error) => {
    notify(error, 'error');
    setTimeout(() => {
      navigate('/')
    }, 3000);
  }

  // ComponentDidMount behavior to fetch data about user and do specific validations
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      errorHandler('Token não encontrado, faça login novamente');
    }

  // Token validation
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
        <UserInfoBar userData={ state.userData }/>
        <Schedule schedule={ state.userData.schedule } handler={ scheduleHandler }/>
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
