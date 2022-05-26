import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(name, link, popupSelector) {
    super(popupSelector)
    this._name = name;
    this._link = link;
  }

  open() {
    super.open()
    this._overviewImage = document.querySelector(".overview__image")
    this._overviewCaption = document.querySelector(".overview__caption")
    this._overviewImage.src = this._link;
    this._overviewImage.alt = this._name;
    this._overviewCaption.textContent = this._name;
  }
}