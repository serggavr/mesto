/** Enable validation config 
 * 
 * @param {object} config 
 */
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  const formsOpenButtons = document.querySelectorAll(config.formOpenButtonsSelector)

  forms.forEach((form) => {
    form.addEventListener('input', (event) => handleFormInput(event.target, form, config))
    form.addEventListener('input', () => handleFormButton(form, config))

    formsOpenButtons.forEach((button) => {
      if (button.dataset.button === form.name)
        button.addEventListener('click', () => clearFormInputsErrors(form, config))
      button.addEventListener('click', () => checkFormValidationOnOpening(form, config))
    })
  })
}

/** Checks and toggles {errorNode} if values in inputs in the form is valid
 * 
 * @param {InputEvent} input
 * @param {HTMLFormElement} form
 * @param {object} config
 */
function handleFormInput(input, form, config) {
  const errorNode = form.querySelector(`[data-input=${input.dataset.input}-error]`)
  errorNode.textContent = input.validationMessage;
  input.classList.toggle(config.inputErrorClass, !input.validity.valid)
  errorNode.classList.toggle(config.errorClass, !input.validity.valid)
}

/** Checks and toggles {submitButton} if the form is valid
 * 
 * @param {HTMLFormElement} form
 * @param {object} config
 */
function handleFormButton(form, config) {
  const submitButton = form.querySelector(config.submitButtonSelector)
  submitButton.disabled = !form.checkValidity()
  submitButton.classList.toggle(config.inactiveButtonClass, !form.checkValidity())
}

/** Check form validation on opening
 * 
 * @param {HTMLFormElement} form
 * @param {object} config
 */
function checkFormValidationOnOpening(form, config) {
  handleFormButton(form, config)
}

/** Cleans errors in inputs form
 * 
 * @param {HTMLFormElement} form
 * @param {object} config
 */
function clearFormInputsErrors(form, config) {
  form.querySelectorAll(config.inputErrorTextSelector).forEach((elem) => elem.textContent = '')
  form.querySelectorAll(config.inputSelector).forEach((elem) => elem.classList.remove(config.inputErrorClass))
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  formOpenButtonsSelector: '.open-popup-with-form-button',
  inputErrorTextSelector: '.popup__error',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
})