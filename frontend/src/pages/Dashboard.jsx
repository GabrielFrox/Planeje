import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateUserInfo, removeDiscipline } from '../services/axios';
import { getUserData } from '../helpers/helpers';
// import { updateUserInfo } from '../services/axios';
import UserInfoBar from '../components/UserInfoBar';
import Schedule from '../components/Schedule';
import NavigationBar from '../components/NavigationBar';

export default function Dashboard() {
  const INITIAL_STATE = {
    userData: undefined,
  };

  const [state, setState] = useState(INITIAL_STATE);
  const navigate = useNavigate();
  const location = useLocation();

  const notify = (msg, type) => toast(msg, {
    type: type,
    position: "top-center",
    autoClose: 1500,
    pauseOnHover: false,
    theme: "dark",
  });

  // Passed trough props to Schedule component to receive the user update in schedules
  const scheduleHandler = async (obj) => {
    const token = localStorage.getItem('token');
    const day = Object.keys(obj)[0];
    const discipline = Object.values(obj)[0];

    const newDaySchedule = {
      [day]: state.userData.schedule[day].concat(discipline)
    };
    // console.log(newDaySchedule);

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

    await updateUserInfo({ token, content: newDaySchedule
    });

    // console.log(updateDB);
  }

  // Function passed by props to ScheduleCard component to get info about the discipline to be removed
  const removeDisciplineHandler = async ({ target }, day) => {
    const disciplineIndex = target.getAttribute('index');
    const token = localStorage.getItem('token');
    const payload = { newArray: [state.userData.schedule[day]], day, token };
    
    // Array.splice returns the removed element and not the original element modified, so i can't
    // use it directly on setState
    const currentDisciplines = state.userData.schedule[day];
    currentDisciplines.splice(disciplineIndex, 1);
    
    setState((curr) => {
      return {
        ...curr,
        userData: {
          ...curr.userData,
          schedule: {
            ...curr.userData.schedule,
            [day]: currentDisciplines
          }
        }
      }
    })
    
    await removeDiscipline(payload);
    // console.log(payload);
  }

  const errorHandler = (error) => {
    notify(error, 'error');
    setTimeout(() => {
      navigate('/')
    }, 3000);
  }

  // ComponentDidMount behavior to fetch data about user and do specific validations
  useEffect(() => {
    getUserData(state, setState, errorHandler);
  // eslint-disable-next-line
  },[]);

  const dashboardContent = () => {
    return (
      <>
        <UserInfoBar userData={ state.userData } errorHandler={ errorHandler } />
        <Schedule schedule={ state.userData.schedule } handler={ scheduleHandler } removeHandler={ removeDisciplineHandler } />
      </>
    );
  }

  return (
    <div>
      <NavigationBar location={ location.pathname }/>
      { state.userData ? dashboardContent() : <h3>Carregando...</h3> }
      <ToastContainer />
    </div>
  )
};
