import React, { useState } from 'react';
import ScheduleCard from './ScheduleCard';
import { disciplines } from '../helpers/disciplines';
import { daysInPt } from '../helpers/daysInPt';

export default function Shedule(props) {
  const [open, setIsOpen] = useState(true);
  const [newSchedule, setNewSchedule] = useState({
    discipline: '',
    day: '',
  });
  const { schedule, handler } = props;
  const days = Object.keys(schedule);

  const optionField = (string, type) => (
    <option key={ string } value={ string }>
      { type === 'day' ? daysInPt[string] : string }
    </option>
  );

  const formHandler = async (e) => {
    e.preventDefault();
    const newDaySchedule = {
      [newSchedule.day]: newSchedule.discipline
    };
    handler(newDaySchedule);
  }

  return (
    <section>
      <header>
        <div>
          <p>SE ORGANIZE DA MELHOR FORMA</p>
          <h3>Cronograma semanal</h3>
        </div>
        <div>
          <button onClick={ () => setIsOpen(false) }>Adicionar Disciplina</button>
          <button>Remover Disciplina</button>
        </div>
      </header>
      {
        days.map((day) => ( 
          <div key={ day }>
            { daysInPt[day] }
            <ScheduleCard array={ schedule[day] } day={ day } />
          </div>
        ))  
      }
      <form onSubmit={ formHandler } className='add-discipline' hidden={ open }>
        <p>Adicionar disciplina</p>
        <button className='close-btn' onClick={ () => setIsOpen(true) }>X</button>
        <fieldset>
          {/* Discipline */}
          <label htmlFor="discipline">Disciplina</label>
          <select onChange={ ({ target: { value } }) => setNewSchedule({ ...newSchedule, discipline: value }) }
          name="discipline" defaultValue=''
          >
            <option value="" disabled={ true }>Escolha uma...</option>
            { disciplines.map((discipline) => (
              optionField(discipline, 'discipline')
            )) }
          </select>

          {/* Day */}
          <label htmlFor="day">Dia</label>
          <select onChange={ ({ target: { value } }) => setNewSchedule({ ...newSchedule, day: value }) } name="day" defaultValue=''>
            <option value="" disabled={ true }>Escolha um...</option>
            { days.map((day) => optionField(day, 'day')) }
          </select>
          <button type="submit">Salvar</button>
        </fieldset>
      </form>
    </section>
  )
};
