import React, { useState } from 'react';
import DetailsPageContainer from '../containers/DetailsPageContainer.jsx';
import HomePageContainer from '../containers/HomePageContainer.jsx';
import LandingPageContainer from '../containers/LandingPageContainer.jsx';
import { Routes, Route } from 'react-router-dom';

const App = (props) => {
  const [activeUser, setActiveUser] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const onLoginHandler = (user) => {
    setActiveUser(user);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPageContainer
            onLogin={onLoginHandler}
            isLoggingIn={isLoggingIn}
            setLoggingInState={setIsLoggingIn}
          />
        }
      />
      <Route path="/main" element={<HomePageContainer user={activeUser} setActiveUser={setActiveUser}/>} />
      <Route path="/details" element={<DetailsPageContainer />} />
    </Routes>
  );
};

export default App;
