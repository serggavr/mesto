import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._overviewImage = document.querySelector(".overview__image")
    this._overviewCaption = document.querySelector(".overview__caption")
  }

  open(name, link) {
    this._overviewImage.src = link;
    this._overviewImage.alt = name;
    this._overviewCaption.textContent = name;
    super.open()
  }
}