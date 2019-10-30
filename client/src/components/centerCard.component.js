//Dependencies
import React from "react";

//CSS Styles
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
        <div className="card" style={cardStyle}>
          <img
            src={props.centers.image}
            className="card-img-top"
            alt="Center"
          />
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
              id="chkSaveMe"
              value={props.centers.centerName}
              onChange={(e) => props.onChangeSaveCenter(e, props.centerId)}
              // checked={props.checked}
              checked={props.centers.isFavorite ? "checked" : ""}
              data-index={props.index}
              data-arrcheck={props.chkIndex}
            />
            <label
              htmlFor="chkSaveMe"
              className="form-check-label"
            >
              Favorite
            </label>
          </div>
        </div>
      </div>
    ); // End Return
  } // End Center Functional Component

 export default Center;