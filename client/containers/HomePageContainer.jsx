import React, {useEffect} from 'react';
import MainPage from '../components/MainPage.jsx';
import { useNavigate } from 'react-router-dom';
import LandingPageContainer from './LandingPageContainer.jsx';

const HomePageContainer = (props) => {
  const navigate = useNavigate();
  if (props.user.username) {
    return <MainPage user={props.user} setActiveUser={props.setActiveUser}></MainPage>;
  } else {
    useEffect(()=>{
      navigate('/')
    }, [])
  }
};

export default HomePageContainer;
