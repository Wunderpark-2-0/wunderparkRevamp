import React from 'react';
// import styles from '../public/stylesheets/styles.scss';

const DetailsIntro = (props) => {
  if (!props.descriptionInfo) {
    return <div>Additional Info:</div>;
  }

  return (
    <div className="detailsIntroCard">
      <div className="descriptionSection">
        <h1>{props.descriptionInfo.title}</h1>
        <h2>Description:</h2>
        <p>{props.descriptionInfo.description}</p>
      </div>
      <img
        src={props.descriptionInfo.photo}
        alt={props.descriptionInfo.altText}
      />
    </div>
  );
};

export default DetailsIntro;
