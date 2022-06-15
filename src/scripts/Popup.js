export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector(".popup__close-button");
    this._handleEscCloseListener = this._handleEscClose.bind(this)
  }

  open() {
    document.addEventListener('keyup', this._handleEscCloseListener);
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keyup', this._handleEscCloseListener);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") this.close()
  }

  _handleClickOnOverlayClose(event) {
    if (event.target === event.currentTarget) this.close();
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", this.close.bind(this))
    this._popup.addEventListener('mouseup', (event) => this._handleClickOnOverlayClose(event));
  }
}