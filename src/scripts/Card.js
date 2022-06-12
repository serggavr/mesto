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

  createCard(isOwner, isLiked) {
    this._card = this._getTemplate();

    this._elementPhoto = this._card.querySelector(".element__photo");
    this._elementTitle = this._card.querySelector(".element__title");
    this._elementDeleteBtn = this._card.querySelector(".element__delete-btn");
    this._elementLikeBtn = this._card.querySelector(".element__like");
    this._elementLikesCounter = this._card.querySelector(".element__likes-counter");

    if (!isOwner) {
      this._elementDeleteBtn.remove()
    }
    if (isLiked) {
      this._elementLikeBtn.classList.add("element__like_active")
    }

    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._elementLikesCounter.textContent = this.likes.length

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    if (this._elementDeleteBtn) {
      this._elementDeleteBtn.addEventListener("click", () => this._handlerCardDeleteBtnClick(this));
    }
    this._elementLikeBtn.addEventListener("click", () => {
      this._handlerCardLikeBtnClick(this)
      this._likeCard()
    });
    this._handleCardClick(this._elementPhoto, this._name, this._link)
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _likeCard() {
    this._elementLikeBtn.classList.toggle("element__like_active");
    if (this._elementLikeBtn.classList.contains("element__like_active")) {
      this._elementLikesCounter.textContent = +this._elementLikesCounter.textContent + 1
    } else {
      this._elementLikesCounter.textContent = +this._elementLikesCounter.textContent - 1
    }
  }
}