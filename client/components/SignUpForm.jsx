import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpForm = (props) => {
  const navigate = useNavigate();
  const onSignUpSubmitHandler = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    axios({
      url: 'http://localhost:3000/user/signup',
      method: 'POST',
      data: { username, password },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Registration Successful');
          props.setLoggingInState(true);
        } else {
          console.log('Registration Unsuccessful');
          props.setLoggingInState(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="formCard">
      <form onSubmit={onSignUpSubmitHandler} className="registrationForm">
        <label htmlFor="username" className="registrationFormLabel">
          Username:
          <input name="username" type="text" placeholder="Choose Username" />
        </label>
        <label htmlFor="password" className="registrationFormLabel">
          Password:
          <input name="password" type="text" placeholder="Choose Password" />
        </label>
        <label htmlFor="confirmPass" className="registrationFormLabel">
          Confirm Password:
          <input
            name="confirmPass"
            type="text"
            placeholder="Confirm Password"
          />
        </label>
        <button type="submit" className="registrationFormButton">
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
