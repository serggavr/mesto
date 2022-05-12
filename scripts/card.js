import {
  openPopup
} from './index.js';


const popupOverview = document.querySelector(".popup_type_element-overview");
const popupOverviewImage = document.querySelector(".overview__image");
const popupOverviewCaption = document.querySelector(".overview__caption");


class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    this._template = document.querySelector(this._templateSelector);
    this._cardTemplate = this._template.content.querySelector(".element").cloneNode(true);
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
    this._elementDeleteBtn.addEventListener("click", () => this._deleteCard());
    this._elementLikeBtn.addEventListener("click", (e) => this._likeCard(e));
    this._elementPhoto.addEventListener("click", (e) => this._openCardPopup(e));
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _likeCard(e) {
    this._elementLikeBtn.classList.toggle("element__like_active");
  }

  _openCardPopup() {
    popupOverviewImage.src = this._link;
    popupOverviewImage.alt = this._name;
    popupOverviewCaption.textContent = this._name;
    openPopup(popupOverview);
  }
}


export {
  Card
}