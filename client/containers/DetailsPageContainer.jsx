import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DetailsIntro from '../components/detailsPage-components/DetailsIntro.jsx';
import Campgrounds from '../components/detailsPage-components/Campgrounds.jsx';
import Weather from '../components/detailsPage-components/Weather.jsx';
import Amenities from '../components/detailsPage-components/Amenities.jsx';
import { useNavigate } from 'react-router-dom';

const DetailsPageContainer = (props) => {
  const [parkDetails, setParkDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      url: `http://localhost:3000/NPS/details/${props.currentCode}`,
      method: 'GET',
    })
      .then((response) => {
        console.log(response.data);
        setParkDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.currentCode]);

  return (
    <div className="details-page">
      <nav className="navBar">
        <button
          type="button"
          onClick={() => {
            navigate('/main');
          }}
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => {
            navigate('/');
          }}
        >
          Logout
        </button>
      </nav>
      <DetailsIntro descriptionInfo={parkDetails.modalDetails} />
      <div className="details-Card-Container">
        <Amenities amenitiesInfo={parkDetails.amenities} />
        <Campgrounds campgroundsInfo={parkDetails.campground} />
        <Weather weatherInfo={parkDetails.weather} />
      </div>
    </div>
  );
};

export default DetailsPageContainer;
