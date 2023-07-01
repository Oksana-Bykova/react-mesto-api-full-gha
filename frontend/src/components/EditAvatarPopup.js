import React from "react";
import { PopupWithForm } from "./PopupWithForm";

import { useRef } from "react";

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  React.useEffect(() => {
    inputRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="edit-photo"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input"
        name="avatar"
        id="link-photo"
        placeholder="Ссылка на новый аватар"
        required=""
        ref={inputRef}
      />
      <span className="popup__error" id="link-photo-error" />
    </PopupWithForm>
  );
}

export { EditAvatarPopup };
