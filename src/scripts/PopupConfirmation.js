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
    this._confirmedFunction(this._card, this._popupSubmitButton)
    // this.close()
  }

  setSubmitButtonTextContent(value) {
    this._popupSubmitButton.value = value
  }

  setEventListeners() {
    super.setEventListeners()

    this._popupForm.addEventListener("submit", (e) => {
      this.setSubmitButtonTextContent("Удаление...")
      this._handleSubmitFormListener(e)

    })
  }

  _removeEventListeners() {
    super._removeEventListeners()
    // this._popupForm.removeEventListener("submit", this._handleSubmitFormListener)
  }

  open(card) {
    super.open()
    this._card = card
  }
}