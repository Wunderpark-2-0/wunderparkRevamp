import React from 'react';

const Amenities = (props) => {
  if (!props.amenitiesInfo) {
    return <div>Amenities:</div>;
  }
  console.log('props.amenities from Amenities component:', props.amenitiesInfo);
  return (
    <div className="details-card amenities">
      <h2>Amenities:</h2>
      <ul>
        {props.amenitiesInfo.map((amenities) => {
          return (
            <li>
              <p>{amenities}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Amenities;
