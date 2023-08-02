import React from 'react';

export default function ScheduleCard({array, day}) {
  return (
    <div className='daySchedule' key={ day }>
      { array.map((content, i) => <p key={ i }>{ content }</p>) }
    </div>
  )
};
