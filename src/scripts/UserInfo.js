export default class UserInfo {
  constructor({
    userNameSelector,
    userDescriptionSelector,
    userAvatarSelector,
    userId,
    cohort
  }) {
    this._userDescriptionContainer = document.querySelector(userDescriptionSelector);
    this._userNameContainer = document.querySelector(userNameSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
    this._userId = userId
    this._cohort = cohort
  }

  getUserInfo() {
    return {
      name: this._userNameContainer.textContent,
      description: this._userDescriptionContainer.textContent
    }
  }

  setUserInfo({
    name,
    about,
    avatar,
    _id,
    cohort
  }) {
    if (name) {
      this._userNameContainer.textContent = name;
    }
    if (about) {
      this._userDescriptionContainer.textContent = about;
    }
    if (avatar) {
      this._userAvatar.src = avatar
      this._userAvatar.alt = this._userNameContainer.textContent
    }
  }


}