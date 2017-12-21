import React from 'react';

const Skill = (props) => (
  <div className="row">
    <div className="form-group col-4">
      <label htmlFor="skill">Skill</label>
      <input type="text" placeholder="Skill" id="skill" onChange={(e) => props.onChange(e, props.id)} />
    </div>
    <div className="form-group col-2">
      <label htmlFor="exp">Experience</label>
      <input type="number" placeholder="Years" id="exp" onChange={(e) => props.onChange(e, props.id)} />
    </div>
    {props.canDelete &&
      <div className="form-group col-2">
        <label>delete</label>
        <button className="button button-danger" onClick={(e) => props.delete(e, props.position)}>delete</button>
      </div>
    }
  </div>
);

export default Skill;