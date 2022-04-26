/** Enable validation config 
 * 
 * @param {object} config 
 */
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  const formsOpenButtons = document.querySelectorAll(config.formOpenButtonsSelector)

  forms.forEach((form) => {
    const submitButton = form.querySelector(config.submitButtonSelector)
    console.log(submitButton)

    form.addEventListener('input', (event) => {
      handleFormInput(event.target, form, config)
      handleFormButton(form, config, submitButton)
    })

    formsOpenButtons.forEach((button) => {
      if (button.dataset.button === form.name)
        button.addEventListener('click', () => clearFormInputsErrors(form, config))
      button.addEventListener('click', () => handleFormButton(form, config, submitButton))
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

  if (!input.validity.valid) {
    showInputError(input, errorNode, config)
  } else {
    hideInputError(input, errorNode, config)
  }
}

/** Shows an input error if the input value is invalid
 * 
 * @param {InputEvent} input
 * @param {HTMLElement} errorNode
 * @param {object} config
 */
function showInputError(input, errorNode, config) {
  errorNode.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass)
  errorNode.classList.add(config.errorClass)

}

/** Removes an input error if the input value is valid
 * 
 * @param {InputEvent} input
 * @param {HTMLElement} errorNode
 * @param {object} config
 */
function hideInputError(input, errorNode, config) {
  input.classList.remove(config.inputErrorClass)
  errorNode.classList.remove(config.errorClass)
}

/** Checks and toggles {submitButton} if the form is valid
 * 
 * @param {HTMLFormElement} form
 * @param {object} config
 */
function handleFormButton(form, config, submitButton) {
  submitButton.disabled = !form.checkValidity()
  submitButton.classList.toggle(config.inactiveButtonClass, !form.checkValidity())
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