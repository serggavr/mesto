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
}