import React, { useEffect, useState } from 'react';
import ScheduleCard from './ScheduleCard';
// import { removeDiscipline } from '../services/axios';
import { disciplines } from '../helpers/disciplines';
import { daysInPt } from '../helpers/daysInPt';

export default function Shedule(props) {
  const disciplinesArray = Object.keys(disciplines);
  const [open, setIsOpen] = useState({ add: true, remove: true });
  const [newSchedule, setNewSchedule] = useState({
    discipline: '',
    day: '',
  });
  const [saveButtonStatus, setSaveButtonStatus] = useState(true);
  const { schedule, handler, removeHandler } = props;
  const days = Object.keys(schedule);

  const optionField = (string, type) => (
    <option key={ string } value={ string }>
      { type === 'day' ? daysInPt[string] : string }
    </option>
  );

  const formHandler = (e) => {
    e.preventDefault();
    const newDaySchedule = {
      [newSchedule.day]: newSchedule.discipline
    };
    handler(newDaySchedule);
  }
  
  useEffect(() => {
    setSaveButtonStatus((newSchedule.discipline === '' || newSchedule.day === ''));
  }, [newSchedule])

  return (
    <section>
      <header>
        <div>
          <p>SE ORGANIZE DA MELHOR FORMA</p>
          <h3>Cronograma semanal</h3>
        </div>
        <div>
          <button onClick={ () => setIsOpen({ ...open, add: false}) }>Adicionar Disciplina</button>
          {/* Hoje é aqui, ta fudido meu caro */}
          <button onClick={ () => setIsOpen({ ...open, remove: !open.remove }) }>Remover Disciplina</button>
        </div>
      </header>
      {
        days.map((day) => ( 
          <div key={ day }>
            { daysInPt[day] }
            <ScheduleCard
              array={ schedule[day] }
              day={ day }
              removeStatus={ open.remove }
              deleteHandler={ removeHandler }
            />
          </div>
        ))  
      }
      <form onSubmit={ formHandler } className='add-discipline' hidden={ open.add }>
        <p>Adicionar disciplina</p>
        <button className='close-btn' onClick={ (e) => { e.preventDefault(); setIsOpen({...open, add: true}) } }>X</button>
        <fieldset>
          {/* Discipline */}
          <label htmlFor="discipline">Disciplina</label>
          <select onChange={ ({ target: { value } }) => setNewSchedule({ ...newSchedule, discipline: value }) }
          name="discipline" defaultValue=''
          >
            <option value="" disabled={ true }>Escolha uma...</option>
            { disciplinesArray.map((discipline) => (
              optionField(discipline, 'discipline')
            )) }
          </select>

          {/* Day */}
          <label htmlFor="day">Dia</label>
          <select onChange={ ({ target: { value } }) => setNewSchedule({ ...newSchedule, day: value }) } name="day" defaultValue=''>
            <option value="" disabled={ true }>Escolha um...</option>
            { days.map((day) => optionField(day, 'day')) }
          </select>
          <button type="submit" disabled={ saveButtonStatus }>Salvar</button>
          {/* <button onClick={saveCheck}>teste</button> */}
        </fieldset>
      </form>
    </section>
  )
};
