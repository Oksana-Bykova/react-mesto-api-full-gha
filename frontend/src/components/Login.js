import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import { AuthForm } from "./AuthForm";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const arr = {
      email: email,
      password: password,
    };
    props.onLogin(arr);
  }

  return (
    <>
      <Header loggedIn={false} headerMenu="Регистрация" />
      <AuthForm
        title="Вход"
        buttonText="Войти"
        handleSubmit={handleSubmit}
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        valueEmail={email}
        valuePassword={password}
      />
    </>
  );
}

export default Login;
