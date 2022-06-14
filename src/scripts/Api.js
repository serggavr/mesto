export default class Api {
  constructor({
    baseUrl,
    token,
    groupId,
  }) {
    this._baseUrl = baseUrl
    this._token = token
    this._groupId = groupId
    this._headers = {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._baseUrl}/${this._groupId}/users/me`, {
        method: 'GET',
        ...this._headers
      })
      .then(res => {
        return this._getResponseData(res)
      })
      .then((data) => {
        return data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getCards() {
    return fetch(`${this._baseUrl}/${this._groupId}/cards`, {
      method: 'GET',
      ...this._headers
    }).then(res => {
      return this._getResponseData(res)
    }).then(data => {
      return data
    }).catch((err) => {
      console.log(err)
    })
  }

  setUser({
    newName,
    newAbout
  }) {
    return fetch(`${this._baseUrl}/${this._groupId}/users/me`, {
      method: 'PATCH',
      ...this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    }).then(res => {
      return this._getResponseData(res)
    }).then(data => {
      return data
    }).catch(err => {
      console.log(err)
    })
  }

  setCard({
    cardName,
    cardLink
  }) {
    return fetch(`${this._baseUrl}/${this._groupId}/cards`, {
      method: 'POST',
      ...this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    }).then(res => {
      return this._getResponseData(res)
    }).then(data => {
      return data
    }).catch(err => {
      console.log(err)
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/${this._groupId}/cards/${cardId}`, {
      method: 'DELETE',
      ...this._headers,
    }).then(res => {
      return this._getResponseData(res)
    }).then(data => {
      console.log(data)
      return data
    }).catch(err => {
      console.log(err)
    })
  }

  likeCard(
    cardId
  ) {
    return fetch(`${this._baseUrl}/${this._groupId}/cards/${cardId}/likes`, {
      method: 'PUT',
      ...this._headers
    }).then(res => {
      return this._getResponseData(res)
    }).then(data => {
      return data
    }).catch(err => {
      console.log(err)
    })
  }

  dislikeCard(
    cardId
  ) {
    return fetch(`${this._baseUrl}/${this._groupId}/cards/${cardId}/likes`, {
      method: 'DELETE',
      ...this._headers
    }).then(res => {
      return this._getResponseData(res)
    }).then(data => {
      return data
    }).catch(err => {
      console.log(err)
    })
  }

  setUserAvatar(avatarSrc) {
    return fetch(`${this._baseUrl}/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      ...this._headers,
      body: JSON.stringify({
        avatar: avatarSrc,
      })
    }).then(res => {
      return this._getResponseData(res)
    }).then(data => {
      return data
    }).catch(err => {
      console.log(err)
    })
  }

}