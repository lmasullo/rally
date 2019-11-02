// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import VideoBg from "reactjs-videobg";
import ogg from "../videos/Neon.ogg";
import webm from "../videos/Neon.webm";
import mp4 from "../videos/Neon.mp4";
import poster from "../image/poster.jpg";
import "../style.css";
// CSS Styles
const cardStyle = {
  width: '18rem',
  marginBottom: '20px',
};

// Functional component of the Centers cards
function Center(props) {
  console.log(props);
  // This is the card html
  return (
    <div className="col-sm-4">
    <VideoBg poster={poster}>
            <VideoBg.Source src={ogg} type="video/ogg" />
            <VideoBg.Source src={webm} type="video/webm" />
            <VideoBg.Source src={mp4} type="video/mp4" />
        </VideoBg>
      <div className="card" style={cardStyle}>
        <Link to={`/detail/${props.centers._id}`}>
          <img
            src={props.centers.image}
            className="card-img-top"
            alt="Center"
          />
        </Link>
        <h5 className="card-header">{props.centers.centerName}</h5>
        <div className="card-body">
          <p className="card-text">{props.centers.description}</p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={props.centers.addressLink}
            className="btn btn-primary m-2"
          >
            Web Site
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={props.centers.mapLink}
            className="btn btn-primary"
          >
            Map
          </a>
        </div>
        <div className="card-footer text-center">
          <input
            type="checkbox"
            className="form-check-input"
            id={props.centers._id}
            value={props.centers.centerName}
            onChange={e => props.onChangeSaveCenter(e, props.centerId)}
            checked={props.isFavorite ? 'checked' : ''}
          />
          <label htmlFor="chkSaveMe" className="form-check-label">
            Favorite
          </label>
        </div>
      </div>
    </div>
  ); // End Return
} // End Center Functional Component

export default Center;
