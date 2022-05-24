import {
  Card
} from './Card.js'
import Section from './Section.js';

import {
  FormValidator
} from './Validate.js'


const validatorSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorTextSelector: '.popup__error',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
// const cardsContainer = document.querySelector(".elements__list");

// popup_type_change_profile
const popupChangeProfile = document.querySelector(".popup_type_change-profile");
const popupChangeProfileForm = document.querySelector(".popup__form[name=edit-profile]");
const popupChangeProfileOpenBtn = document.querySelector(".profile__change-button");
const popupChangeProfileNewName = popupChangeProfileForm.querySelector(".popup__input_type_username");
const popupChangeProfileNewDescription = popupChangeProfileForm.querySelector(".popup__input_type_description");

//enable validation popupChangeProfileForm
const popupChangeProfileFormValidation = new FormValidator(validatorSelectors, popupChangeProfileForm)
popupChangeProfileFormValidation.enableValidation()

// popup_type_add-element-card
const popupAddElementCard = document.querySelector(".popup_type_add-element-card");
const popupAddElementCardForm = document.querySelector(".popup__form[name=add-element-card]");
const popupAddElementCardOpenBtn = document.querySelector(".profile__add-button");
const popupAddElementCardNewCardName = popupAddElementCardForm.querySelector(".popup__input_type_card-name");
const popupAddElementCardNewCardLink = popupAddElementCardForm.querySelector(".popup__input_type_image-link");

//enable validation popupAddElementCardForm
const popupAddElementCardFormValidation = new FormValidator(validatorSelectors, popupAddElementCardForm)
popupAddElementCardFormValidation.enableValidation()

// popup close buttons
const popupClosePopupsButtons = document.querySelectorAll(".popup__close-button");

const cardTemplate = "#cardTemplate";
const cardsContainer = ".elements__list"


const initialCards = [{
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(name, link, templateSelector) {
  return new Card(name, link, templateSelector).createCard()
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link, cardTemplate)
    cardsList.addItem(cardElement);
  }
}, cardsContainer)




/** Add card to element__list
 * 
 * @param {Array} initialCards 
 */
// function addCardsToCardsContainer(initialCards) {
//   initialCards.forEach((elem) => {
//     cardsContainer.append(createCard(elem.name, elem.link, cardTemplate))
//   });
// }

/** Open popup 
 * 
 * @param {HTMLElement} popup
 */
function openPopup(popup) {
  document.addEventListener('keyup', closePopupOnKeyDown);
  popup.addEventListener('mouseup', closePopupOnClickOnOverlay);
  popup.classList.add("popup_opened");
}

/** Close popups 
 * 
 * @param {HTMLElement} popup
 */
function closePopup(popup) {
  document.removeEventListener('keyup', closePopupOnKeyDown);
  popup.removeEventListener('mouseup', closePopupOnClickOnOverlay);
  popup.classList.remove("popup_opened");
}

function fillOnLoadProfilePopup() {
  popupChangeProfileNewName.value = profileName.textContent;
  popupChangeProfileNewDescription.value = profileDescription.textContent;
}

/** Add value from popup__change_profile to the profile
 * 
 * @param {SubmitEvent} event 
 */
function changeProfileContent(event) {
  event.preventDefault();
  profileName.textContent = popupChangeProfileNewName.value;
  profileDescription.textContent = popupChangeProfileNewDescription.value;
  closePopup(popupChangeProfile);
}

/** Add new card to element__list
 * 
 * @param {SubmitEvent} event 
 */
function addNewCard(event) {
  event.preventDefault();
  cardsList.addItemToTopOfList(createCard(popupAddElementCardNewCardName.value, popupAddElementCardNewCardLink.value, cardTemplate));
  closePopup(popupAddElementCard);
}

/** Close popup on key down 'Escape' and remove self listener
 * 
 */
function closePopupOnKeyDown() {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

/** Close popup on 'click' on overlay and remove self listener
 * 
 */
function closePopupOnClickOnOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

popupChangeProfileOpenBtn.addEventListener("click", () => {
  fillOnLoadProfilePopup();
  popupChangeProfileFormValidation.clearFormInputsErrors()
  openPopup(popupChangeProfile);
});

popupAddElementCardOpenBtn.addEventListener("click", () => {
  popupAddElementCardForm.reset();
  popupAddElementCardFormValidation.clearFormInputsErrors()
  openPopup(popupAddElementCard);
});

popupClosePopupsButtons.forEach((elem) => elem.addEventListener("click", () => {
  closePopup(elem.closest(".popup"));
}));

popupChangeProfileForm.addEventListener("submit", (event) => {
  changeProfileContent(event);
});

popupAddElementCardForm.addEventListener("submit", (event) => {
  addNewCard(event);
});

// addCardsToCardsContainer(initialCards);
cardsList.renderItems()
fillOnLoadProfilePopup();


export {
  openPopup
}