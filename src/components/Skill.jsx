import React from 'react';

const Skill = (props) => {
  return (
  <div className="row">
    <div className="form-group col-4">
      <label>Skill</label>
      <input type="text" placeholder="Skill" id="skill" name="skill" onChange={(e) => props.onChange(e, props.id)} />
    </div>
    <div className="form-group col-2">
      <label>Experience</label>
      <input type="number" placeholder="Years" id="exp" name="exp" onChange={(e) => props.onChange(e, props.id)} />
    </div>
    {props.position !== 0 &&
      <div className="form-group col-2">
        <label>delete</label>
        <button className="button button-danger" onClick={(e) => props.delete(e, props.position)}>delete</button>
      </div>
    }
  </div>
  )
};

export default Skill;