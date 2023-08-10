import React, { useState } from 'react';
import { inputField } from '../helpers/helpers';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../services/axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const INITIAL_STATE = {
    email: '',
    password: ''
  }

  const [state, setState] = useState(INITIAL_STATE);
  const navigate = useNavigate();

  const notify = (msg, type) => toast(msg, {
    type: type,
    position: "top-center",
    autoClose: 1500,
    pauseOnHover: false,
    theme: "dark",
  });

  const formHandler = async (e) => {
    e.preventDefault();
    const data = state;
    const loginResult = await login(data);
    console.log(loginResult);
    if (loginResult.status === 401) notify(loginResult.data.message, 'error');
    else {
      notify('Logado com sucesso', 'success');
      localStorage.setItem('token', loginResult.data.token);
      setTimeout(() => { navigate('/dashboard') }, 3000); 
    }
  }

  const fieldHandler = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <form onSubmit={ formHandler }>
        { inputField('email', 'email', 'email', 'Seu email', fieldHandler) }
        { inputField('password', 'password', 'senha', 'Sua senha', fieldHandler) }
        <button type="submit">Login</button>
      </form>

      <section>
        <p>Ainda não é cadastrado? Clique <Link to='/register'>aqui</Link> e se cadastre</p>
      </section>
      <ToastContainer />
    </div>
  )
};
