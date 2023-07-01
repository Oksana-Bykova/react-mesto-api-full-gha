import React from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useContext } from "react";

function EditProfilePopup(props) {
  //подписываемся на контекст
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleName(evt) {
    setName(evt.target.value);
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input  popup__input_type_name"
        name="name"
        id="name"
        minLength={2}
        maxLength={40}
        required=""
        //placeholder={name}
        onChange={handleName}
        value={name || ''}
      />
      <span className="popup__error" id="name-error" />
      <input
        type="text"
        className="popup__input  popup__input_type_hobby"
        name="about"
        id="hobby"
        minLength={2}
        maxLength={200}
        required=""
        //placeholder={description}
        onChange={handleDescription}
        value={description || ''}
      />
      <span className="popup__error" id="hobby-error" />
    </PopupWithForm>
  );
}

export { EditProfilePopup };
