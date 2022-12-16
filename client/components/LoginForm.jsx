import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = (props) => {
  const navigate = useNavigate();
  const onLoginSubmitHandler = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    //make axios post request
    axios({
      url: 'http://localhost:3000/user/login',
      method: 'POST',
      data: { username, password },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          props.onLogin(response.data);
          navigate('/main');
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="formCard">
      <form onSubmit={onLoginSubmitHandler} className="registrationForm">
        <label htmlFor="username" className="registrationFormLabel">
          Username:
          <input name="username" type="text" placeholder="Username"></input>
        </label>
        <label htmlFor="password" className="registrationFormLabel">
          Password:
          <input name="password" type="text" placeholder="Password"></input>
        </label>
        <button type="submit" className="registrationFormButton">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
