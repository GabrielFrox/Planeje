import React, { useState } from 'react';
import { inputField } from '../helpers/helpers';
import { Link } from 'react-router-dom';

export default function Login() {
  const INITIAL_STATE = {
    email: '',
    password: ''
  }
  const [state, setState] = useState(INITIAL_STATE);

  const formHandler = async (e) => {
    e.preventDefault();
    const data = state;
    console.log(data);
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
    </div>
  )
};
