import React from "react";

function AuthForm(props) {

  return(
    <div className="form__container">
      <h1 className="form__title">{props.title}</h1>
      <form 
      className="form__form"
      onSubmit={props.handleSubmit}> 
      <input 
        type="text"
        className="form__input"
        name="email"
        id="email"
        placeholder="Email"
        minLength={2}
        maxLength={30}
        required=""
        onChange={props.handleEmail}
        value={props.valueEmail}
      />
      <input
        type="text"
        className="form__input"
        name="password"
        id="password"
        placeholder="Пароль"
        minLength={2}
        maxLength={30}
        required=""
        onChange={props.handlePassword}
        value={props.valuePassword}
      />
      <button type="submit" className="form__button">{props.buttonText}</button>
    
      </form>
      
    </div>
  )
}

export {AuthForm};