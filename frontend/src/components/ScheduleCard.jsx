import React from 'react';

export default function ScheduleCard(array) {
  return (
    <div className='daySchedule'>
      { array.map((array, i) => <p>{ array[i] }</p>) }
    </div>
  )
};
