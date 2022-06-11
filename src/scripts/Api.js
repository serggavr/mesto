export default class Api {
  constructor({
    baseUrl,
    token,
    groupId,
  }) {
    this.baseUrl = baseUrl
    this.token = token
    this.groupId = groupId
    this.headers = {
      authorization: this.token
    }
  }

  // getInitialCards() {
  //   return fetch(`${this.baseUrl}/cards`, {
  //     ...headers,
  //     method: 'GET'
  //   })
  // }

  getUser() {
    // console.log({
    //   method: 'GET',
    //   headers: {
    //     ...this.headers
    //   }
    // }, `${this.baseUrl}/users/me`)

    return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          ...this.headers
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => {
        // console.log(result)
        return data
      })
      .catch((err) => {
        console.log(err)
      })
  }


  /**
   * @returns {  [ { likes, _id, name, link, {owner}, createdA } ]  }
   */
  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: {
        ...this.headers
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
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
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
      // console.log(data)
      return data
    }).catch(err => {
      console.log(err)
    })
  }

  setCard({
    cardName,
    cardLink
  }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    }).then(res => {
      if (res.ok) {
        // console.log(res)
        return res.json()
      }
    }).then(data => {
      // console.log(data)
      return data
    }).catch(err => {
      console.log(err)
    })
  }

}