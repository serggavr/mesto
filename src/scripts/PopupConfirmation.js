import Popup from "./Popup.js"

export default class PopupConfirmation extends Popup {
  constructor({
      confirmedFunction
    },
    popupSelector
  ) {
    super(popupSelector)
    this._confirmedFunction = confirmedFunction
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSubmitButton = this._popup.querySelector('.popup__button');
    this._handleSubmitFormListener = this._handleSubmitForm.bind(this)
  }

  _handleSubmitForm(event) {
    event.preventDefault();
    this._confirmedFunction(this._card)
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener("submit", (e) => {
      this._handleSubmitFormListener(e)
    })
  }

  open(card) {
    super.open()
    this._card = card
  }

  setSubmitButtonTextContent(value) {
    this._popupSubmitButton.value = value
  }
}