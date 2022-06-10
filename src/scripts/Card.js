export default class Card {
  constructor(name, link, templateSelector, {
    handlerCardClick,
    handlerCardDeleteBtnClick
  }) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handlerCardClick;
    this._handlerCardDeleteBtnClick = handlerCardDeleteBtnClick;
  }

  _getTemplate() {
    this._cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
    return this._cardTemplate;
  }

  createCard() {
    this._card = this._getTemplate();

    this._elementPhoto = this._card.querySelector(".element__photo");
    this._elementTitle = this._card.querySelector(".element__title");
    this._elementDeleteBtn = this._card.querySelector(".element__delete-btn");
    this._elementLikeBtn = this._card.querySelector(".element__like");

    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._elementTitle.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._elementDeleteBtn.addEventListener("click", () => this._handlerCardDeleteBtnClick(this));
    this._elementLikeBtn.addEventListener("click", (e) => this._likeCard(e));
    this._handleCardClick(this._elementPhoto, this._name, this._link)
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _likeCard() {
    this._elementLikeBtn.classList.toggle("element__like_active");
  }
}