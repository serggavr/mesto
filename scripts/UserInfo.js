export default class UserInfo {
  constructor({
    userNameSelector,
    userDescriptionSelector
  }) {
    this._userDescriptionContainer = document.querySelector(userDescriptionSelector);
    this._userNameContainer = document.querySelector(userNameSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameContainer.textContent,
      description: this._userDescriptionContainer.textContent
    }
  }

  setUserInfo({
    newUserName,
    newUserDescription
  }) {
    this._userNameContainer.textContent = newUserName;
    this._userDescriptionContainer.textContent = newUserDescription;
  }
}