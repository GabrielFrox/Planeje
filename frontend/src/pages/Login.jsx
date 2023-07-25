import React, { useState } from 'react';
import { inputField } from '../helpers/helpers';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../services/axios';
import { Link } from 'react-router-dom';

export default function Login() {
  const INITIAL_STATE = {
    email: '',
    password: ''
  }
  const [state, setState] = useState(INITIAL_STATE);

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
    if (loginResult.status === 401) notify(loginResult.data.message, 'error');
    else {
      notify('Logado com sucesso', 'success');
    }
  }

  const fieldHandler = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <form onSubmit={ formHandler }>
        { inputField(true, 'text', 'email', 'email', fieldHandler) }
        { inputField(true, 'password', 'password', 'senha', fieldHandler) }
        <button type="submit">Login</button>
      </form>

      <section>
        <p>Ainda não é cadastrado? Clique <Link to='/register'>aqui</Link> e se cadastre</p>
      </section>
      <ToastContainer />
    </div>
  )
};
