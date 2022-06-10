import Popup from "./Popup.js"

export default class PopupConfirmation extends Popup {
  constructor({
      confirmedFunction
    },
    popupSelector
  ) {
    super(popupSelector)
    this.confirmedFunction = confirmedFunction
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _handleSubmitForm(event) {
    event.preventDefault();
    this.confirmedFunction(this._card)
    this.close()
  }

  setEventListeners() {
    super.setEventListeners()
    this._handleSubmitFormListener = this._handleSubmitForm.bind(this)
    this._popupForm.addEventListener("submit", this._handleSubmitFormListener)
  }

  _removeEventListeners() {
    super._removeEventListeners()
    this._popupForm.removeEventListener("submit", this._handleSubmitFormListener)
  }

  open(card) {
    super.open()
    this._card = card
    // console.log(this._popup)
    // console.log(this._popupForm)
  }
}