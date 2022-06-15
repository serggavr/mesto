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
    this._handleSubmitFormListener = this._handleSubmitForm.bind(this)
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
    this._submitForm(this._getInputValues())
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener("submit", (e) => {
      this._handleSubmitFormListener(e)
    })
  }

  close() {
    super.close()
    this._popupForm.reset()
  }

  setSubmitButtonTextContent(value) {
    this._popupSubmitButton.value = value
  }
}