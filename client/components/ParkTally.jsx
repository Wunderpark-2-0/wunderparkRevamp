import React, { _useEffect, useState } from 'react';
import parkcodes from '../public/parkcodes.js';
import ProgressBar from './ProgressBar.jsx';
// import

const ParkTally = (props) => {
  const parksVisited = [];
  //  iterate through the parkcodes js file
  for (let park in parkcodes) {
    const { codes } = props;
    if (codes.includes(parkcodes[park])) {
      parksVisited.push(
        <li key={Math.random() * 10000000} className="visited_item">
          {park}
        </li>
      );
    }
  }

  return (
    <div className="parkTally">
      <ul className="visited_list">
        <h2>Parks Visited: {parksVisited.length}</h2>
        <ProgressBar percent={props.codes} />
        <div className="listItems">{parksVisited}</div>
      </ul>
    </div>
  );
};

export default ParkTally;
