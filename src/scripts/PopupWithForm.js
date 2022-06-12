import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({
    submitForm
  }, popupSelector) {
    super(popupSelector)
    this._submitForm = submitForm;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSubmitButton = this._popup.querySelector('.popup__button');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues
  }

  _handleSubmitForm(event) {
    event.preventDefault();
    this._submitForm(this._getInputValues(), this._popupSubmitButton)
    this.close()
  }

  setEventListeners() {
    super.setEventListeners()
    this._handleSubmitFormListener = this._handleSubmitForm.bind(this)
    this._popupForm.addEventListener("submit", this._handleSubmitFormListener)
  }

  close() {
    super.close()
    this._popupForm.reset()
  }

  _removeEventListeners() {
    super._removeEventListeners()
    this._popupForm.removeEventListener("submit", this._handleSubmitFormListener)
  }
}