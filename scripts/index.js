import {
  Card
} from './card.js'

import {
  FormValidator,
  validatorSelectors
} from './validate.js'

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const cardsContainer = document.querySelector(".elements__list");
const popups = document.querySelectorAll(".popup");

// popup_type_change_profile
const popupChangeProfile = document.querySelector(".popup_type_change-profile");
const popupChangeProfileForm = document.querySelector(".popup__form[name=edit-profile]");
const popupChangeProfileOpenBtn = document.querySelector(".profile__change-button");
const popupChangeProfileNewName = popupChangeProfileForm.querySelector(".popup__input_type_username");
const popupChangeProfileNewDescription = popupChangeProfileForm.querySelector(".popup__input_type_description");

const popupChangeProfileFormValidation = new FormValidator(validatorSelectors, popupChangeProfileForm)
popupChangeProfileFormValidation.enableValidation()

// popup_type_add-element-card
const popupAddElementCard = document.querySelector(".popup_type_add-element-card");
const popupAddElementCardForm = document.querySelector(".popup__form[name=add-element-card]");
const popupAddElementCardOpenBtn = document.querySelector(".profile__add-button");
const popupAddElementCardNewCardName = popupAddElementCardForm.querySelector(".popup__input_type_card-name");
const popupAddElementCardNewCardLink = popupAddElementCardForm.querySelector(".popup__input_type_image-link");

const popupAddElementCardFormValidation = new FormValidator(validatorSelectors, popupAddElementCardForm)
popupAddElementCardFormValidation.enableValidation()

// popup close buttons
const popupClosePopupsButtons = document.querySelectorAll(".popup__close-button");


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

/** Add card to element__list
 * 
 * @param {Array} initialCards 
 */
function addCardsToCardsContainer(initialCards) {
  initialCards.forEach((elem) => {
    cardsContainer.append(new Card(elem.name, elem.link, cardTemplate).createCard())
  });
}

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
  cardsContainer.prepend(new Card(popupAddElementCardNewCardName.value, popupAddElementCardNewCardLink.value, cardTemplate).createCard());
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

addCardsToCardsContainer(initialCards);
fillOnLoadProfilePopup();


export {
  openPopup
}