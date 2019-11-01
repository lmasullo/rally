// Dependencies
import React from 'react';
import Toast from 'react-bootstrap/Toast';

function SuccessToast(props) {
  return (
    <Toast show={props.show} delay={3000} autohide>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Racquet Rally</strong>
      </Toast.Header>
      <Toast.Body>Favorite Saved Successfully!</Toast.Body>
    </Toast>
  );
}

export default SuccessToast;
