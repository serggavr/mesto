import Card from './Card.js'
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import FormValidator from './FormValidator.js'
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const validatorSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorTextSelector: '.popup__error',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const profileNameSelector = ".profile__title";
const profileDescriptionSelector = ".profile__subtitle"

// popup_type_change_profile
const changeProfilePopupSelector = ".popup_type_change-profile";
const popupChangeProfileForm = document.querySelector(".popup__form[name=edit-profile]");
const popupChangeProfileOpenBtn = document.querySelector(".profile__change-button");
const popupChangeProfileNewName = popupChangeProfileForm.querySelector(".popup__input_type_username");
const popupChangeProfileNewDescription = popupChangeProfileForm.querySelector(".popup__input_type_description");

//enable validation popupChangeProfileForm
const popupChangeProfileFormValidation = new FormValidator(validatorSelectors, popupChangeProfileForm)
popupChangeProfileFormValidation.enableValidation()

// popup_type_add-element-card
const AddElementCardPopupSelector = ".popup_type_add-element-card"
const popupAddElementCardForm = document.querySelector(".popup__form[name=add-element-card]");
const popupAddElementCardOpenBtn = document.querySelector(".profile__add-button");
const popupAddElementCardNewCardName = popupAddElementCardForm.querySelector(".popup__input_type_card-name");
const popupAddElementCardNewCardLink = popupAddElementCardForm.querySelector(".popup__input_type_image-link");

//enable validation popupAddElementCardForm
const popupAddElementCardFormValidation = new FormValidator(validatorSelectors, popupAddElementCardForm)
popupAddElementCardFormValidation.enableValidation()

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

const userInfo = new UserInfo({
  userNameSelector: profileNameSelector,
  userDescriptionSelector: profileDescriptionSelector
})

const popupOverview = ".popup_type_element-overview";

const handleCardClick = (cardPhoto, cardName, cardLink) => {
  cardPhoto.addEventListener("click", (e) => {
    const CardPopup = new PopupWithImage(cardName, cardLink, popupOverview)
    CardPopup.open()
  })
}

function createCard(name, link, templateSelector) {
  const newCard = new Card(name, link, templateSelector, {
    handleCardClick: handleCardClick
  }).createCard()
  return newCard
}

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item.name, item.link, cardTemplate)
      cardsList.addItem(cardElement);
    }
  },
  cardsContainer)

function fillOnLoadProfilePopup() {
  const {
    name,
    description
  } = userInfo.getUserInfo()
  popupChangeProfileNewName.value = name
  popupChangeProfileNewDescription.value = description
}

/** Add value from popup__change_profile to the profile
 * 
 * @param {SubmitEvent} event 
 */
const changeProfileContent = (formInputs) => {
  userInfo.setUserInfo({
    newUserName: formInputs.popup__input_type_username,
    newUserDescription: formInputs.popup__input_type_description
  })
}

/** Add new card to element__list
 * 
 * @param {SubmitEvent} event 
 */
const addNewCard = () => {
  cardsList.addItemToTopOfList(createCard(popupAddElementCardNewCardName.value, popupAddElementCardNewCardLink.value, cardTemplate));
}

popupChangeProfileOpenBtn.addEventListener("click", () => {
  fillOnLoadProfilePopup();
  popupChangeProfileFormValidation.clearFormInputsErrors()

  const popup = new PopupWithForm({
    submitForm: changeProfileContent
  }, changeProfilePopupSelector)

  popup.open()
});

popupAddElementCardOpenBtn.addEventListener("click", () => {
  const popup = new PopupWithForm({
    submitForm: addNewCard
  }, AddElementCardPopupSelector)

  popupAddElementCardFormValidation.clearFormInputsErrors()
  popup.open()
});


cardsList.renderItems()