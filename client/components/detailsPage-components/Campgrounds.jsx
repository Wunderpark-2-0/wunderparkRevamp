import React from 'react';

const Campgrounds = (props) => {
  if (!props.campgroundsInfo) {
    return (
      <div>
        <div>Camgrounds Info:</div>;
      </div>
    );
  }

  const campGroundsArr = [];
  for (let camp of props.campgroundsInfo.campground) {
    campGroundsArr.push(
      <li className="campgroundsLI">
        <p className="campgroundsP">Name: {camp.name}</p>
        <p>Email: {camp.contactEmail}</p>
        <p>Phone: {camp.contactPhone}</p>
        <p>Total Camp Sites: {camp.campsitesTotal}</p>
      </li>
    );
  }

  return (
    <div className="details-card campgrounds">
      <h2 className="campgroundsH2">Campgrounds:</h2>
      {campGroundsArr.length === 0 && (
        <img
          src="https://i0.wp.com/southseattleemerald.com/wp-content/uploads/2021/06/no_camping_sign_Luke_Brennan.jpg?resize=1038%2C576&ssl=1"
          style={{ height: 'auto', width: '350px' }}
        />
      )}
      <ul className="campgroundsUL">{campGroundsArr}</ul>
    </div>
  );
};

export default Campgrounds;
