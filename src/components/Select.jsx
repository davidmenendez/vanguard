import React from 'react';

const Select = (props) => (
  <select
    name={props.name}
    defaultValue={props.placeholder}
    onChange={props.onChange}
    name={props.name}
    id={props.id}
  >
    {props.placeholder && 
      <option disabled hidden>{props.placeholder}</option>
    }
    {props.data.map(d => <option key={d.id}>{d.value}</option>)}
  </select>
);

export default Select;