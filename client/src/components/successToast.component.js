// Dependencies
import React from 'react';
import Toast from 'react-bootstrap/Toast';
import VideoBg from "reactjs-videobg";
import ogg from "../videos/Neon.ogg";
import webm from "../videos/Neon.webm";
import mp4 from "../videos/Neon.mp4";
import poster from "../image/poster.jpg";
import "../style.css";

function SuccessToast(props) {
  return (
    <Toast show={props.show} delay={3000} autohide>
    <VideoBg poster={poster}>
            <VideoBg.Source src={ogg} type="video/ogg" />
            <VideoBg.Source src={webm} type="video/webm" />
            <VideoBg.Source src={mp4} type="video/mp4" />
        </VideoBg>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Racquet Rally</strong>
      </Toast.Header>
      <Toast.Body>Favorite Saved Successfully!</Toast.Body>
    </Toast>
  );
}

export default SuccessToast;
