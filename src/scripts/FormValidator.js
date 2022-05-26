export default class FormValidator {
  constructor(validatorSelectors, form) {
    this._form = form
    this._inputSelector = validatorSelectors.inputSelector
    this._submitButtonSelector = validatorSelectors.submitButtonSelector
    this._inputErrorTextSelector = validatorSelectors.inputErrorTextSelector
    this._inactiveButtonClass = validatorSelectors.inactiveButtonClass
    this._inputErrorClass = validatorSelectors.inputErrorClass
    this._errorClass = validatorSelectors.errorClass
    this._formInputs = this._form.querySelectorAll(this._inputSelector);
  }

  enableValidation() {
    this._setEventListeners()
    this._toggleFormButton();
  }

  _setEventListeners() {
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._form.addEventListener('input', (event) => {
      this._handleFormInput(event.target);
      this._toggleFormButton();
    })
  }

  _handleFormInput(input) {
    (!input.validity.valid) ? this._showInputError(input): this._hideInputError(input);
  }

  _showInputError(input) {
    const errorNode = this._form.querySelector(`[data-input=${input.dataset.input}-error]`);
    errorNode.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
    errorNode.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorNode = this._form.querySelector(`[data-input=${input.dataset.input}-error]`);
    input.classList.remove(this._inputErrorClass);
    errorNode.classList.remove(this._errorClass);
  }

  _toggleFormButton() {
    this._submitButton.disabled = !this._form.checkValidity();
    this._submitButton.classList.toggle(this._inactiveButtonClass, !this._form.checkValidity());
  }

  clearFormInputsErrors() {
    this._formInputs.forEach((input) => {
      this._hideInputError(input)
    })

    this._toggleFormButton();
  }
};