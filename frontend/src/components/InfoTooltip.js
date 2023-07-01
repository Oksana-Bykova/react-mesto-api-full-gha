import React from "react";
import SuccsesTrue from "../images/SuccsesTrue.png";
import SuccsesFalse from "../images/SuccsesFalse.png";

function InfoTooltip(props) {

  const nameClass = `popup  ${
    props.isOpen ? "popup_opened" : ""
  }`; 
  return (
    <div className={nameClass}>
      <div className="popup__container">
      <img
        className="popup__image"
        src={props.succses ? SuccsesTrue : SuccsesFalse}
        alt={props.succses ? "картинка -галочка" : "картинка крестик"}
      />
      <h2 className="popup__title-register">
        {props.succses
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте ещё раз."}
      </h2>
      <button className="popup__close"
      onClick={props.onClose}
      ></button>
      </div>
    </div>
  );
}

export {InfoTooltip};