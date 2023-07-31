import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { inputField } from '../helpers/helpers';
import { registerNewUser } from '../services/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateUser() {
  const INITIAL_STATE = {
    name: '',
    email: '',
    password: ''
  };

  const [state, setState] = useState(INITIAL_STATE);
  const navigate = useNavigate();

  const notify = (msg, type) => toast(msg, {
    position: "top-center",
    type: type,
    autoClose: 1500,
    pauseOnHover: false,
    theme: "dark",
  });

  const formHandler = async (e) => {
    e.preventDefault();
    const registeredUser = await registerNewUser(state);
    if (registeredUser.status === 403) notify(registeredUser.data.message, 'error');
    else {
      notify(registeredUser.data.message, 'success');
      setTimeout(() => { navigate('/') }, 3000)
    }
  }

  const fieldHandler = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value.toLowerCase() });
  };

  return (
    <div>
      <form onSubmit={ formHandler }>
        <fieldset>
          { inputField('text', 'name', 'nome', 'Seu nome', fieldHandler) }
          { inputField('email', 'email', 'email', 'Seu email', fieldHandler) }
          { inputField('password', 'password', 'senha', 'Sua senha', fieldHandler) }
        </fieldset>
        <button type="submit">Criar conta</button>
      </form>
      <section>
        <p>Já é cadastrado? Faça o login clicando <Link to='/'>aqui</Link></p>
      </section>
      <ToastContainer />
    </div>
  )
};
