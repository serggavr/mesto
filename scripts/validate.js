const validatorSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorTextSelector: '.popup__error',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

class FormValidator {
  constructor(validatorSelectors, form) {
    this.form = form
    this._formSelector = validatorSelectors.formSelector
    this._inputSelector = validatorSelectors.inputSelector
    this._submitButtonSelector = validatorSelectors.submitButtonSelector
    this._inputErrorTextSelector = validatorSelectors.inputErrorTextSelector
    this._inactiveButtonClass = validatorSelectors.inactiveButtonClass
    this._inputErrorClass = validatorSelectors.inputErrorClass
    this._errorClass = validatorSelectors.errorClass
  }

  enableValidation() {
    this._setEventListeners()
    this._toggleFormButton();
  }

  _setEventListeners(submitButton) {
    this.form.addEventListener('input', (event) => {
      this._handleFormInput(event.target);
      this._toggleFormButton(submitButton);
    })
  }

  _handleFormInput(input) {
    const errorNode = this.form.querySelector(`[data-input=${input.dataset.input}-error]`);
    (!input.validity.valid) ? this._showInputError(input, errorNode): this._hideInputError(input, errorNode);
  }

  _showInputError(input, errorNode) {
    errorNode.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
    errorNode.classList.add(this._errorClass);
  }

  _hideInputError(input, errorNode) {
    input.classList.remove(this._inputErrorClass);
    errorNode.classList.remove(this._errorClass);
  }

  _toggleFormButton() {
    const submitButton = this.form.querySelector(this._submitButtonSelector);
    submitButton.disabled = !this.form.checkValidity();
    submitButton.classList.toggle(this._inactiveButtonClass, !this.form.checkValidity());
  }

  clearFormInputsErrors() {
    const formInputs = this.form.querySelectorAll(this._inputSelector);

    formInputs.forEach((input) => {
      const errorNode = this.form.querySelector(`[data-input=${input.dataset.input}-error]`);

      this._hideInputError(input, errorNode)
    })

    this._toggleFormButton();
  }
};

export {
  FormValidator,
  validatorSelectors
}