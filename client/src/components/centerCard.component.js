// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
// Import css file to make zoom on hover work
import '../css/style.css';

// CSS Styles
const cardStyle = {
  width: '18rem',
  marginBottom: '20px',
};

// Functional component of the Centers cards
function Center(props) {
  // This is the card html
  return (
    <div className="col-sm-4">
      <div className="card zoom" style={cardStyle}>
        <Link to={`/detail/${props.centers._id}`}>
          <img
            src={props.centers.image}
            className="card-img-top"
            alt="Center"
          />
        </Link>
        <h5 className="card-header">{props.centers.centerName}</h5>
        <div className="card-body text-center">
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
            hidden={props.isHidden}
          />
          <label
            htmlFor="chkSaveMe"
            className="form-check-label"
            hidden={props.isHidden}
          >
            Favorite
          </label>
        </div>
      </div>
    </div>
  ); // End Return
} // End Center Functional Component

export default Center;
