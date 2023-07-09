import React from "react";

import Header from "./Header.js";
import Main from "./Main.js";

import { PopupWithForm } from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.jsx";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { EditProfilePopup } from "./EditProfilePopup.js";
import { EditAvatarPopup } from "./EditAvatarPopup.js";
import { AddPlacePopup } from "./AddPlacePopup.js";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import { Register } from "./Regisret.js";
import * as auth from '../utils/auth.js';
import { InfoTooltip } from "./InfoTooltip.js";

function App() {
  //стейт переменные для открытия попапов, когда в них попадает тру(при нажатии на кнопку открытия попапа в компоненте Main - состояние isOpen тоже менятся на тру и попапу присваивается класс popup_opened)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  //стейт переменная для полноразмерной картинки при клике
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false);

  //стейт переменная для информации о текущем пользователе
  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

 const navigate = useNavigate();
 const [succses, setSuccses] = React.useState(false);
 const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);

 //собираем емайл из логина
 const [userEmail, setUserEmail] = React.useState({});

 //стейт для определения вошел пользователь в ситсему или нет
 const [loggedIn, setLoggedIn] = React.useState(false);

  // 4 функцйии - обработчика для событий клика на кнопки -открытия попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleRegisterAvatar() {
    setIsRegisterPopupOpen(!isRegisterPopupOpen);
  }

  //обработчик клика по крестику в попапе
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPhotoPopupOpen(false);
    setIsRegisterPopupOpen(false);
  }

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfileInformation(), api.getInitialCards()])
      .then((data) => {
        setCurrentUser(data[0]);
        //console.log(data[0]);
        setCards(data[1]);
      })
      .catch((err) => console.log(err));
    }
    
  }, [ loggedIn]);

  React.useEffect(()=> {
    tokenCheck();
  },[]);


  //лайки для карточки
  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    console.log(card);
    const isLiked = card.likes.some((item) => item === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((data) => {
        setCards((state) => state.map((c) => (c._id === card._id ? data : c)));
      })
      .catch((err) => console.log(err));
  };

  //удаление карточек
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((data) => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })

      .catch((err) => console.log(err));
  }

  //обработка формы редактирования профиля
  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })

      .catch((err) => console.log(err));
  }

  //обработка формы изменения аватара
  function handleUpdateAvatar(data) {
    api
      .editPhotoProfile(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //обработка формы добавления новой карточки
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

   
   function handleloggedIn(data) {
    setLoggedIn(true);
    setUserEmail(data.email);
   }

   //сохраняем токен 
   function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    if (jwt) {
      auth.getContent(jwt)
        .then((data) => {
          console.log(data);
          handleloggedIn(data);
          setCurrentUser(data);

          navigate('/');
          console.log(currentUser);
        })
        .catch((err) => console.log(err));
    };
  };

    
//сабмит формы регистрации
   function handleSubmitRegister(email, password) {
    
    auth.register(email, password)
    .then((res) => {
      setSuccses(true);
      handleRegisterAvatar();
      navigate('/signin', {replace: true});
      
  })
    .catch((err) => {
      console.log(err);
      setSuccses(false)
      handleRegisterAvatar()})
   }

// выход
   function onOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    console.log('выход успешный');
    console.log(loggedIn);
   };

   //сабмит авторизации(ввода логина)
   function handleSubmitLogin (arr) {
    auth.authoize(arr.email, arr.password)
    .then((data) => {
      console.log(data);
      console.log(arr);
      if (data.jwt){
        localStorage.setItem('jwt', data.jwt);
        handleloggedIn(arr);
        tokenCheck();
        //navigate('/');
      }})
      .catch((err) => console.log(err));
      
   }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          
          <Routes>

            <Route path="/signin" element={<Login  onLogin={handleSubmitLogin} />} />

            <Route path="/" element={<ProtectedRouteElement element={Main}
             loggedIn={loggedIn}
             onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={setSelectedCard}
            hendler={setIsPhotoPopupOpen}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            userEmail={userEmail}
            onOut={onOut}
             />} />

            <Route path="/signup" element={<Register onRegister={handleSubmitRegister}/>} /> 
            <Route path="*" element={loggedIn? <Navigate to="/" /> : <Navigate to="/signin" replace/>} />
          </Routes>
          
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonName="Создать"
          onAddPlace={handleAddPlaceSubmit}
        />

        {/*Попап подтверждения удаления карточки*/}
        <PopupWithForm name="delete-card" title="Вы уверены?"></PopupWithForm>

        <ImagePopup
          name="photo-viewing"
          card={selectedCard}
          isOpen={isPhotoPopupOpen}
          onClose={closeAllPopups}
        />

        {/*Попап успешной и неуспешной регистрации*/}
        <InfoTooltip succses={succses} isOpen={isRegisterPopupOpen} onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
