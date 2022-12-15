import React from 'react';
// import styles from '../public/stylesheets/styles.scss';

const DetailsIntro = (props) => {
  if (!props.descriptionInfo) {
    return <div>Additional Info</div>;
  }

  return (
    <div className="detailsIntroCard">
      <img
        src={props.descriptionInfo.photo}
        alt={props.descriptionInfo.altText}
      />
      <div className="descriptionSection">
        <h2>Description</h2>
        <p>{props.descriptionInfo.description}</p>
      </div>
    </div>
  );
};

export default DetailsIntro;
