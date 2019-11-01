// Dependencies
import React from 'react';
import Toast from 'react-bootstrap/Toast';

function RallyToast(props) {
  // Set initial toast display to none
  let toastStyle = {
    display: 'none',
  };

  // Header styling
  const styleHeader = {
    backgroundColor: 'dodgerblue',
    color: 'white',
  };

  // Check the showStyle prop and apply
  if (props.showStyle === 'display') {
    toastStyle = {
      display: 'block',
    };
  } else {
    toastStyle = {
      display: 'none',
    };
  }

  return (
    <Toast show={props.show} delay={3000} autohide style={toastStyle}>
      <Toast.Header style={styleHeader}>
        <img src="/images/rally25.png" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Racquet Rally</strong>
      </Toast.Header>
      <Toast.Body>{props.message}</Toast.Body>
    </Toast>
  );
}

export default RallyToast;
