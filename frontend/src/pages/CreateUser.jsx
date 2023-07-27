import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const notify = (msg) => toast.success(msg, {
    position: "top-center",
    autoClose: 1500,
    pauseOnHover: false,
    theme: "dark",
  });

  const formHandler = async (e) => {
    e.preventDefault();
    const registeredUser = await registerNewUser(state);
    notify(registeredUser.data.message);
    setTimeout(() => { navigate('/') }, 3000)
  }

  const fieldHandler = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
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
      <ToastContainer toastStyle={{ backgroundColor: "" }} />
    </div>
  )
};
