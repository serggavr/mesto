export default class Card {
  constructor({
    name,
    link,
    likes,
    _id,
    owner
  }, templateSelector, {
    handlerCardClick,
    handlerCardDeleteBtnClick,
    handlerCardLikeBtnClick
  }) {
    this.likes = likes;
    this.id = _id;
    this.owner = owner
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handlerCardClick;
    this._handlerCardDeleteBtnClick = handlerCardDeleteBtnClick;
    this._handlerCardLikeBtnClick = handlerCardLikeBtnClick;
  }

  _getTemplate() {
    this._cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
    return this._cardTemplate;
  }

  createCard(userId) {
    this.userId = userId
    this._card = this._getTemplate();

    this._elementPhoto = this._card.querySelector(".element__photo");
    this._elementTitle = this._card.querySelector(".element__title");
    this._elementDeleteBtn = this._card.querySelector(".element__delete-btn");
    this._elementLikeBtn = this._card.querySelector(".element__like");
    this._elementLikesCounter = this._card.querySelector(".element__likes-counter");

    if (!this._isOwner(userId)) {
      this._elementDeleteBtn.remove()
    }

    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._elementTitle.textContent = this._name;

    this.updateLikes(this.likes)
    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    if (this._elementDeleteBtn) {
      this._elementDeleteBtn.addEventListener("click", () => this._handlerCardDeleteBtnClick(this));
    }
    this._elementLikeBtn.addEventListener("click", () => {
      this._handlerCardLikeBtnClick(this)
    });
    this._handleCardClick(this._elementPhoto, this._name, this._link)
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  updateLikes(likes) {
    this.likes = likes
    this._elementLikesCounter.textContent = this.likes.length;
    if (this.isLiked()) {
      this._elementLikeBtn.classList.add("element__like_active");
    } else {
      this._elementLikeBtn.classList.remove("element__like_active");
    }
  }

  isLiked() {
    return this.likes.some((like) => like._id === this.userId)
  }

  _isOwner() {
    return this.owner._id === this.userId
  }
}