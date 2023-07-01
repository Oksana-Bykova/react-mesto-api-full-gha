import React from "react";

function PopupWithForm(props) {
  const nameClass = `popup  popup_intended_${props.name} ${
    props.isOpen ? "popup_opened" : ""
  }`;

  return (
    <div className={nameClass}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="закрыть окно"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={props.name}
         // noValidate=""
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__button">
            {props.buttonName || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}
export { PopupWithForm };
