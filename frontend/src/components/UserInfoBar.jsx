import React from 'react';

export default function UserInfoBar(props) {
  const { userData: {
    name,
    email,
    objective,
    course,
    cutscore,
    language,
  } } = props;
  console.log(props.userData);
  

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
