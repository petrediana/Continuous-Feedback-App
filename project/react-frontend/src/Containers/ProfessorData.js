import React from 'react';

const ProfessorData = (props) => (
    <div>
      <h4> {typeof props.professor.name !== "undefined" ? props.professor.name : ''} </h4>
      <h6> with specialty {typeof props.professor.speciality !== "undefined" ? props.professor.speciality : ''}</h6>
    </div>
);

export default ProfessorData
