/** Enable validation config 
 * 
 * @param {object} config 
 */
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    const submitButton = form.querySelector(config.submitButtonSelector)
    const inactiveSubmitButton = config.inactiveButtonClass

    form.addEventListener('input', (event) => {
      handleFormInput(event.target, form, config)
      handleFormButton(form, submitButton, inactiveSubmitButton)
    })

    handleFormButton(form, submitButton, inactiveSubmitButton)
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
function handleFormButton(form, submitButton, inactiveSubmitButton) {
  submitButton.disabled = !form.checkValidity()
  submitButton.classList.toggle(inactiveSubmitButton, !form.checkValidity())
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorTextSelector: '.popup__error',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
})