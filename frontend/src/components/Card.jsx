import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useContext } from "react";

function Card(props) {
  const handleClick = () => {
    props.onCardClick(props.card);
    props.hendler(true);
  };

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  };

  const userContext = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === userContext._id;
  const isLiked = props.card.likes.some((item) => item._id === userContext._id);
  const cardLikeButtonClassName = `group__button ${
    isLiked && "group__button_active"
  }`;

  return (
    <li className="group__element">
      <img
        className="group__image"
        alt={props.name}
        src={props.card.link}
        onClick={handleClick}
      />
      <div className="group__container">
        <h2 className="group__title">{props.card.name}</h2>
        <div className="group__container-like">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="поставить отметку  мне нравится"
          ></button>
          <span className="group__counter-like">{props.card.likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button className="group__batton-delite" onClick={handleDeleteClick} />
      )}
    </li>
  );
}

export { Card };
