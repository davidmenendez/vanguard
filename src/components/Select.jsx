import React from 'react';

const Select = (props) => {
  console.log(props);
  return (
    <select
      name={props.name}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      name={props.name}
      id={props.id}
    >
      {props.data.map(d => <option key={d.id}>{d.value}</option>)}
    </select>
  )
};

export default Select;