import React from 'react';

const Modal = (props) => (
  <div className="modal">
    <div className="modal-body">
      <h3>{props.title}</h3>
      {props.children}
      <button onClick={props.close} className="button button-danger">close</button>
    </div>
  </div>
);

export default Modal;