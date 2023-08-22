import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserInfoBar from '../components/UserInfoBar';
import SubjectsList from '../components/SubjectsList';
import { ToastContainer, toast } from 'react-toastify';
import { disciplines } from '../helpers/disciplines';


// 
// PRECISA DE UMA NOVA FORMA DE ACESSAR O NOME DA MATÉRIA ATUAL, URL NÃO SUPORTA ACENTOS
// ACABA POR RETORNAR STRING COM CÓDIGOS
// 

export default function DisciplineSubject(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const indexOfSubject = pathname.split('/').pop();
  const subjects = Object.keys(disciplines);

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

  const disciplineSubjects = disciplines[subjects[indexOfSubject]].subject;
  const disciplineSubjectContent = () => (
    <>
      <p>Área do conhecimento</p>
      <h2>{ subjects[indexOfSubject] }</h2>
      <SubjectsList disciplineSubjects={ disciplineSubjects } />
    </>
  );
  
  return (
    <div>
      <UserInfoBar errorHandler={ errorHandler }/>
      { disciplineSubjectContent() }
      <ToastContainer />
    </div>
  );
};
