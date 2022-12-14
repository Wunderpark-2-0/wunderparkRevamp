import React from 'react';
import DetailsPageContainer from '../containers/DetailsPageContainer.jsx';
import HomePageContainer from '../containers/HomePageContainer.jsx';
import LandingPageContainer from '../containers/LandingPageContainer.jsx';
import { Routes, Route } from 'react-router-dom';

const App = (props) => {
  return (
    <Routes>
      <Route path="/" element={<LandingPageContainer />} />
      <Route path="/main" element={<HomePageContainer />} />
      <Route path="/details" element={<DetailsPageContainer />} />
    </Routes>
  );
};

export default App;
