export default class UserInfo {
  constructor({
    userNameSelector,
    userDescriptionSelector,
    userAvatarSelector
  }) {
    this._userDescriptionContainer = document.querySelector(userDescriptionSelector);
    this._userNameContainer = document.querySelector(userNameSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameContainer.textContent,
      description: this._userDescriptionContainer.textContent
    }
  }

  setUserInfo({
    newUserName,
    newUserDescription,
    newUserAvatarImageSrc
  }) {
    if (newUserName) {
      this._userNameContainer.textContent = newUserName;
    }
    if (newUserDescription) {
      this._userDescriptionContainer.textContent = newUserDescription;
    }
    if (newUserAvatarImageSrc) {
      this._userAvatar.src = newUserAvatarImageSrc
      this._userAvatar.alt = this._userNameContainer.textContent
    }
  }
}