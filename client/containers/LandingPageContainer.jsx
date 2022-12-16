import React from 'react';
import SignUpForm from '../components/SignUpForm.jsx';
import LoginForm from '../components/LoginForm.jsx';

const LandingPageContainer = (props) => {
  const loginBtnClick = () => {
    props.setLoggingInState(true);
  };
  const signUpBtnClick = () => {
    props.setLoggingInState(false);
  };

  return (
    <div>
      <nav className="navBar">
        <h1>
          WÜNDER PARKS <sub>©</sub>
        </h1>
        <div>
          <button onClick={loginBtnClick}>LOGIN</button>
          <button onClick={signUpBtnClick}>SIGNUP</button>
        </div>
      </nav>
      {props.isLoggingIn && <LoginForm onLogin={props.onLogin} />}
      {!props.isLoggingIn && (
        <SignUpForm setLoggingInState={props.setLoggingInState} />
      )}
    </div>
  );
};

export default LandingPageContainer;
