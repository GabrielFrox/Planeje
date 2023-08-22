import React from 'react';

export default function SubjectsList({ disciplineSubjects }) {
  return (
    <ul>
      { disciplineSubjects.map((subject) => <li key={ subject } > { subject } </li>) }
    </ul>
  );
};
