class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      credentials: "include",
      headers: this.headers,
    }).then((res) => this._checkResponse(res));
  }

  addCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  getProfileInformation() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this.headers,
    }).then((res) => this._checkResponse(res));
  }

  editProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ? `PUT` : `DELETE`}`,
      headers: this.headers,
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this._checkResponse(res));
  }

  editPhotoProfile(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }
}

//***********************************************************************создаем экземпляр класса Api
const api = new Api({
  baseUrl: "https://api.oksana.bikova.nomoreparties.sbs",
  headers: {
   // authorization: "1a1902ac-0572-4b58-9e09-22d73d49699e",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
  },
});
export { api };
