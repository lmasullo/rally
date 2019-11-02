// Dependencies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// CSS Styles
const cardStyle = {
  width: '18rem',
  marginBottom: '20px',
};

const hoverStyle = {
  transform: 'scale(1.1)',
  // transition: 'all 1.5s ease-in',
};

// Functional component of the Centers cards
function Center(props) {
  const [currStyle, setCurrStyle] = useState(cardStyle);

  console.log(props);
  // This is the card html
  return (
    <div className="col-sm-4">
      <div
        className="card"
        style={currStyle}
        onMouseOver={e => setCurrStyle(hoverStyle)}
        onMouseLeave={e => setCurrStyle(cardStyle)}
      >
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
