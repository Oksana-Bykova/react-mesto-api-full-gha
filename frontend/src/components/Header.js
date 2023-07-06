import React from "react";
import logo from "../images/Vector(2).svg";
import { Link } from "react-router-dom";


function Header(props) {
  return (
    <header className="header page__section">
      <img className="header__logo" src={logo} alt="Логотип сервиса Место" />
      <div className={`${props.loggedIn? "header__profile-info" : "header__profile-info-hide"}`}>
        <span className="header__email">{props.userEmail}</span>
        <p className="header__link" onClick={props.onOut}>Выйти</p>
      </div>
      <Link to={`${props.headerMenu === "Войти"? "/signin" :"/signup" }`} className={`${props.loggedIn? "header__profile-info-hide" : "header__link" }`}>{props.headerMenu}</Link>
      
    </header>
  );
}

export default Header;
