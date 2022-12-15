import React from 'react';

const Weather = (props) => {
  if (!props.weatherInfo) {
    return <div>7-Day Forecast</div>;
  }
  //weather - date, tempmin, tempmax, description
  const weather = [];
  props.weatherInfo.forEach((data) => {
    weather.push(
      <li>
        <span>{data.date.slice(5).replace('-', '/')}</span>{' '}
        <span>Min: {data.tempmin}F </span> <span>Max: {data.tempmax}F</span>
        <div>{data.description}</div>
      </li>
    );
  });
  return (
    <div className="details-card">
      <h2>7-Day Forecast</h2>
      <ul>{weather}</ul>
    </div>
  );
};

export default Weather;
