export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this.setEventListeners()
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removeEventListeners()
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleClickOnOverlayClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton = this._popup.querySelector(".popup__close-button");
    this._handleEscCloseListener = this._handleEscClose.bind(this)

    this._popupCloseButton.addEventListener("click", this.close.bind(this))
    this._popup.addEventListener('mouseup', (event) => this._handleClickOnOverlayClose(event));
    document.addEventListener('keyup', this._handleEscCloseListener);
  }

  _removeEventListeners() {
    this._popupCloseButton.removeEventListener("click", this.close.bind(this))
    this._popup.removeEventListener('mouseup', (event) => this._handleClickOnOverlayClose(event));
    document.removeEventListener('keyup', this._handleEscCloseListener);
  }
}