import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import UserInfoBar from '../components/UserInfoBar';
import { disciplines } from '../helpers/disciplines';

export default function Disciplines() {
  const location = useLocation();
  const navigate = useNavigate();
  const disciplinesArray = Object.keys(disciplines);
  // console.log(disciplines);

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
      { 
        disciplinesArray.map((discipline, i) => (
        <Link to={`/disciplines/${ i }`} key={ discipline }>
        {/* <Link to={ <DisciplineSubject subject={ discipline } /> } key={ discipline }> */}
          <div>
            <img className='subjects-icon' src={ disciplines[discipline].icon } alt="" />
            <h3>{ discipline }</h3>
          </div>
        </Link>
        ))
      }
      <ToastContainer />
    </div>
  )
};
