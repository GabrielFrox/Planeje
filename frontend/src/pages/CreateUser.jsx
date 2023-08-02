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
    password: '',
    objective: '',
    course: '',
    language: '',
    cutscore: 0
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
          {/* Name field */}
          { inputField('text', 'name', 'nome', 'Seu nome', fieldHandler) }

          {/* Email field */}
          { inputField('email', 'email', 'email', 'Seu email', fieldHandler) }

          {/* Password Field */}
          { inputField('password', 'password', 'senha', 'Sua senha', fieldHandler) }

          {/* Objective field */}
          { inputField('text', 'objective', 'objetivo', 'Objetivo', fieldHandler) }

          {/* Course field */}
          { inputField('text', 'course', 'curso', 'Curso desejado', fieldHandler) }

          {/* Cut-score field */}
          { inputField('number', 'cutscore', 'nota de corte', 'Valor', fieldHandler) }

          {/* Language field */}
          <label htmlFor="language">Língua estrangeira:</label>
          {/* This event needs to be done here because of some error in handler function when it tries to read name */}
          <select name="language" id="linguagens" defaultValue='' onChange={ ({ target: { value } }) => {
            setState({ ...state, language: value })
          } }>
            <option value="" disabled={ true }>Escolha uma</option>
            <option value="inglês">inglês</option>
            <option value="espanhol">espanhol</option>
          </select>
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
