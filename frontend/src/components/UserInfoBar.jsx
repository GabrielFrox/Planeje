import React, { useState, useEffect } from 'react';
import { getUserData } from '../helpers/helpers';

export default function UserInfoBar(props) {
  const INITIAL_STATE = { userData: {
    name: 'carregando...',
    email: 'carregando...',
    objective: 'carregando...',
    course: 'carregando...',
    cutscore: 'carregando...',
    language: 'carregando...'
  }};
  const { errorHandler } = props;
  const [state, setState] = useState(INITIAL_STATE);
  useEffect(() => {
    (async function (){
      await getUserData(state, setState, errorHandler);
    })()
    // eslint-disable-next-line
  }, [])


  const { userData: {
    name,
    email,
    objective,
    course,
    cutscore,
    language,
  }} = state;

  return (
    <section>
      <div>
        <p>Aqui é uma imagem</p>
        <aside>
          <h3>Olá { name.split(' ')[0] }!</h3>
          <p>{ course }</p>
        </aside>
      </div>
      <div>
        <p>email: { email }</p>
        <p>objetivo: { objective }</p>
        <p>nota de corte: { cutscore }</p>
        <p>língua estrangeira: { language }</p>
      </div>
    </section>
  )
};
