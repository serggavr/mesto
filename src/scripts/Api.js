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
      authorization: this._token
    }
  }


  getUser() {
    return fetch(`${this._baseUrl}/${this._groupId}/users/me`, {
        method: 'GET',
        headers: {
          ...this._headers
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
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
      headers: {
        ...this._headers
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
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
      headers: {
        ...this._headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
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
      headers: {
        ...this._headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(data => {
      console.log(data)
      return data
    }).catch(err => {
      console.log(err)
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/${this._groupId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Content-Type': 'application/json'
      },
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
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
      headers: {
        ...this._headers,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
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
      headers: {
        ...this._headers,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(data => {
      return data
    }).catch(err => {
      console.log(err)
    })
  }

  setUserAvatar(avatarSrc) {
    return fetch(`${this._baseUrl}/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarSrc,
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(data => {
      return data
    }).catch(err => {
      console.log(err)
    })
  }

}