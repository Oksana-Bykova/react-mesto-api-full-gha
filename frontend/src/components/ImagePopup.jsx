import React from "react";

function ImagePopup(props) {
  const nameClass = `popup  popup_intended_${props.name} ${
    props.isOpen ? "popup_opened" : ""
  }`;

  return (
    <div className={nameClass}>
      <div className="popup__container-photo">
        <img alt= {props.card.name} className="popup__photo" src={props.card.link} />
        <span className="popup__span">{props.card.name}</span>
        <button
          className="popup__close"
          type="button"
          aria-label="закрыть окно"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
