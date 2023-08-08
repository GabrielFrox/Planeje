import React from 'react';

export default function ScheduleCard({array, day, removeStatus, deleteHandler}) {
  // const deleteHandler = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.getAttribute('index'));
  // }

  return (
    <div className='daySchedule' key={ day }>
      { 
        array.map((content, i) =>
        // For some reason the another syntax creates a error of missing "key" attribute (<> </>)
          <React.Fragment key={ `${content}-${i}` }>
            <p key={ content }>{ content }</p>
            <button
              onClick={ (e) => deleteHandler(e, day) }
              index={ i }
              key={ `${content}-key` }
              hidden={ removeStatus }
            >
              x
            </button>
          </React.Fragment>
        )
      }
    </div>
  )
};
