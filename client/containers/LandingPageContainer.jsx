import React from "react";
import SignUpForm from "../components/SignUpForm.jsx";
import LoginForm from "../components/LoginForm.jsx";

const LandingPageContainer = (props) => {
  const loginBtnClick = () =>{
    props.setLoggingInState(true);
  }
  const signUpBtnClick = () =>{
    props.setLoggingInState(false);
  }
  
  return <div>
    <nav>
      <button onClick={loginBtnClick}>LOGIN</button>
      <button onClick={signUpBtnClick}>SIGNUP</button>
    </nav>
    {props.isLoggingIn && <LoginForm onLogin={props.onLogin}/>}
    {!props.isLoggingIn &&  <SignUpForm setLoggingInState={props.setLoggingInState}/>}
  </div>;
};


export default LandingPageContainer;
