import React from 'react';

const Campgrounds = (props) => {
  if (!props.campgroundsInfo) {
    return <div>Camgrounds Info</div>;
  }

  const campGroundsArr = [];
  for (let camp of props.campgroundsInfo.campground) {
    campGroundsArr.push(
      <li>
        <p>Name: {camp.name}</p>
        <p>Email: {camp.contactEmail}</p>
        <p>Phone: {camp.contactPhone}</p>
        <p>Total Camp Sites: {camp.campsitesTotal}</p>
      </li>
    );
  }

  return (
    <div className="details-card">
      <h2>Campgrounds:</h2>
      <ul>{campGroundsArr}</ul>
    </div>
  );
};

export default Campgrounds;
