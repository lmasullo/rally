// Dependencies
import React from 'react';

// CSS Styles
const cardStyle = {
  width: '18rem',
  marginBottom: '20px',
};

// Functional component of the Users cards
function UserCard(props) {
  console.log(props);
  // This is the card html
  return (
    <div className="col-sm-4">
      <div className="card" style={cardStyle}>
        <img src={props.users.image} className="card-img-top" alt="Center" />
        <h5 className="card-header">{props.users.name}</h5>
        <div className="card-body">
          <p className="card-text">Skill Level: {props.users.skillLevel}</p>
          <p className="card-text">
            Contact:{' '}
            {/* <a href="mailto:${props.users.email}">{props.users.email}</a> */}
            <a href={`mailto:${props.users.email}`}>{props.users.email}</a>
          </p>
        </div>
      </div>
    </div>
  ); // End Return
} // End Users Functional Component
export default UserCard;
