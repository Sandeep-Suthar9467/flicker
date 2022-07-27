import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onLoginSuccess } from "../reducer";
import "./login.css";

interface ErrorMssg{
name: string;
message: string;

};

type closeFunction = () => void;
interface Props {
  children?: React.ReactNode;
  handleClose: closeFunction;
}

const LoginForm = (props: Props) => {
  const [errorMessages, setErrorMessages] = useState<ErrorMssg>({name: '' ,message: ''});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  const renderErrorMessage = (name:string) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
      <div className="login-form">
        <div className="title">LogIn</div>
        { renderForm }
      </div>
  );
}

export default LoginForm;
