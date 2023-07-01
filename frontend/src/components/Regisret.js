import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import { AuthForm } from "./AuthForm";

function Register(props) {
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
    props.onRegister(email, password);
  }

  return (
    <>
      <Header loggedIn={false} headerMenu="Войти" />
      <AuthForm
        title="Регистрация"
        buttonText="Зарегистрироваться"
        handleSubmit={handleSubmit}
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        valueEmail={email}
        valuePassword={password}
      />
      <p className="form__span">
        Уже зарегистрированы?
        <Link to="/sign-in" className="form__span">
          {" "}
          Войти
        </Link>
      </p>
    </>
  );
}

export { Register };
