import React from 'react';
import UserInfoBar from '../components/UserInfoBar';

export default function DisciplineSubject(props) {
  console.log(props);
  const disciplineSubjectContent = () => (
    <>
      <p>Teste</p>
    </>
  );
  
  return (
    <div>
      <UserInfoBar />
      { disciplineSubjectContent() }
    </div>
  );
};
