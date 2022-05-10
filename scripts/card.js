import {
  openPopup
} from './index.js';


const popupOverview = document.querySelector(".popup_type_element-overview");
const popupOverviewImage = document.querySelector(".overview__image");
const popupOverviewCaption = document.querySelector(".overview__caption");


class Card {
  constructor(name, link, template) {
    this._name = name;
    this._link = link;
    this._template = template;
  }

  _getTemplate() {
    const cardElement = this._template.content.querySelector(".element").cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._card = this._getTemplate();

    const elementPhoto = this._card.querySelector(".element__photo");
    const elementTitle = this._card.querySelector(".element__title");
    const elementDeleteBtn = this._card.querySelector(".element__delete-btn");
    const elementLikeBtn = this._card.querySelector(".element__like");

    elementPhoto.src = this._link;
    elementTitle.textContent = this._name;

    this._setEventListeners(elementDeleteBtn, elementLikeBtn, elementPhoto);

    return this._card;
  }

  _setEventListeners(elementDeleteBtn, elementLikeBtn, elementPhoto) {
    elementDeleteBtn.addEventListener("click", () => this._deleteCard());
    elementLikeBtn.addEventListener("click", (e) => this._likeCard(e));
    elementPhoto.addEventListener("click", (e) => this._openCardPopup(e));
  }

  _deleteCard() {
    this._card.remove();
  }

  _likeCard(e) {
    e.target.classList.toggle("element__like_active");
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