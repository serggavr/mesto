const validatorSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorTextSelector: '.popup__error',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

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
      toggleFormButton(form, submitButton, inactiveSubmitButton)
    })

    toggleFormButton(form, submitButton, inactiveSubmitButton)
  })
}

/** Checks and toggles {errorNode} if values in inputs in the form is valid
 * 
 * @param {InputEvent} input
 * @param {HTMLFormElement} form
 * @param {object} config
 */
function handleFormInput(input, form, config) {
  (!input.validity.valid) ? showInputError(input, form, config): hideInputError(input, form, config);
}

/** Shows an input error if the input value is invalid
 * 
 * @param {InputEvent} input
 * @param {HTMLElement} errorNode
 * @param {object} config
 */
function showInputError(input, form, config) {
  const errorNode = form.querySelector(`[data-input=${input.dataset.input}-error]`)

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
function hideInputError(input, form, config) {
  const errorNode = form.querySelector(`[data-input=${input.dataset.input}-error]`)

  input.classList.remove(config.inputErrorClass)
  errorNode.classList.remove(config.errorClass)
}

/** Checks and toggles {submitButton} if the form is valid
 * 
 * @param {HTMLFormElement} form
 * @param {object} config
 */
function toggleFormButton(form, submitButton, inactiveSubmitButton) {
  submitButton.disabled = !form.checkValidity()
  submitButton.classList.toggle(inactiveSubmitButton, !form.checkValidity())
}

/** Cleans errors in inputs form
 * 
 * @param {HTMLFormElement} form
 * @param {object} config
 */
function clearFormInputsErrors(form) {
  const submitButton = form.querySelector(validatorSelectors.submitButtonSelector)
  const formInputs = form.querySelectorAll(validatorSelectors.inputSelector)

  formInputs.forEach((input) => hideInputError(input, form, validatorSelectors))
  toggleFormButton(form, submitButton, validatorSelectors.inactiveButtonClass)
}

enableValidation(validatorSelectors)