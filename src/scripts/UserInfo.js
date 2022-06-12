export default class UserInfo {
  constructor({
    userNameSelector,
    userDescriptionSelector,
    userAvatarSelector,
    userId,
    cohort
  }) {
    this.userId = userId
    this._userDescriptionContainer = document.querySelector(userDescriptionSelector);
    this._userNameContainer = document.querySelector(userNameSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
    this._cohort = cohort
  }

  getUserInfo() {
    return {
      name: this._userNameContainer.textContent,
      about: this._userDescriptionContainer.textContent,
      avatar: this._userAvatar.src,
      _id: this.userId,
      cohort: this._cohort
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
      this._name = name
      this._userNameContainer.textContent = name;
    }
    if (about) {
      this._userDescriptionContainer.textContent = about;
    }
    if (avatar) {
      this._userAvatar.src = avatar
      this._userAvatar.alt = this._userNameContainer.textContent
    }
    if (_id) {
      this.userId = _id
    }
    if (cohort) {
      this._cohort = cohort
    }
  }
}