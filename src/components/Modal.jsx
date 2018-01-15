import React from 'react';

const Modal = (props) => {
  const clickHandler = e => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    } else {
      props.close();
    }
  };

  return (
    <div className="modal" onClick={clickHandler}>
      <div className="modal-body">
        <h3>{props.title}</h3>
        {props.children}
        <button onClick={props.close} className="button button-danger">close</button>
      </div>
    </div>
  );
};

export default Modal;