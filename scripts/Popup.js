// function openPopup(popup) {
//   document.addEventListener('keyup', closePopupOnKeyDown);
//   popup.addEventListener('mouseup', closePopupOnClickOnOverlay);
//   popup.classList.add("popup_opened");
// }

/** Close popups 
 * 
 * @param {HTMLElement} popup
 */
// function closePopup(popup) {
//   document.removeEventListener('keyup', closePopupOnKeyDown);
//   popup.removeEventListener('mouseup', closePopupOnClickOnOverlay);
//   popup.classList.remove("popup_opened");
// }

// function closePopupOnKeyDown() {
//   if (event.key === "Escape") {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// popupClosePopupsButtons.forEach((elem) => elem.addEventListener("click", () => {
//   closePopup(elem.closest(".popup"));
// }));

// function closePopupOnClickOnOverlay(event) {
//   if (event.target === event.currentTarget) {
//     closePopup(event.target);
//   }
// }


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

  _handleEscClose() {
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
    document.addEventListener('keyup', this._handleEscCloseListener);
    this._popup.addEventListener('mouseup', (event) => this._handleClickOnOverlayClose(event));
  }

  _removeEventListeners() {
    this._popupCloseButton.removeEventListener("click", this.close.bind(this))
    document.removeEventListener('keyup', this._handleEscCloseListener);
    this._popup.removeEventListener('mouseup', (event) => this._handleClickOnOverlayClose(event));
  }
}