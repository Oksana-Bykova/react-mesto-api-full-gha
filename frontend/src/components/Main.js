import React from "react";
import { api } from "../utils/Api";
import { Card } from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useContext } from "react";
import Header from "./Header.js";
import {Footer} from "./Footer.js";

function Main(props) {
  //подписываемся на контекст
  const userContext = useContext(CurrentUserContext);


  return (
    <>
      <Header  loggedIn={true} userEmail={props.userEmail} onOut={props.onOut}/>
      
      <main>
        <section className="profile root__section">
          <div className="profile__container">
            <button
              className="profile__edit-photo-button"
              type="button"
              aria-label="изменить фотографию профиля"
              onClick={props.onEditAvatar}
            >
              <img
                className="profile__image"
                src={userContext.avatar}
                alt="Фотография пользователя в профиле"
              />
            </button>
            <div className="profile__info">
              <div className="profile__name">
                <h1 className="profile__title">{userContext.name}</h1>
                <button
                  className="profile__edit-button"
                  type="button"
                  aria-label="изменить инфлрмацию профиля"
                  onClick={props.onEditProfile}
                ></button>
              </div>
              <p className="profile__hobby">{userContext.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="добавить новую фотографию"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="group">
          <ul className="group__ul">
            {props.cards.map((item) => (
              <Card
                key={item._id}
                onCardClick={props.onCardClick}
                card={item}
                hendler={props.hendler}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
