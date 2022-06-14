import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._overviewImage = this._popup.querySelector(".overview__image")
    this._overviewCaption = this._popup.querySelector(".overview__caption")
  }

  open(name, link) {
    this._overviewImage.src = link;
    this._overviewImage.alt = name;
    this._overviewCaption.textContent = name;
    super.open()
  }
}