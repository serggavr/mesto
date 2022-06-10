// export const initialCards = [{
//     name: "Архыз",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//   },
//   {
//     name: "Челябинская область",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//   },
//   {
//     name: "Иваново",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//   },
//   {
//     name: "Камчатка",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//   },
//   {
//     name: "Холмогорский район",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
//   },
//   {
//     name: "Байкал",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//   },
// ];

export const validatorSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorTextSelector: '.popup__error',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const profileNameSelector = ".profile__title";
export const profileDescriptionSelector = ".profile__subtitle"
export const profileAvatarSelector = ".profile__avatar"
export const cardTemplateSelector = "#cardTemplate";
export const cardsContainerSelector = ".elements__list"
export const popupOverviewSelector = ".popup_type_element-overview";

// popup_type_change_profile
export const changeProfilePopupSelector = ".popup_type_change-profile";
export const popupChangeProfileForm = document.querySelector(".popup__form[name=edit-profile]");
export const popupChangeProfileOpenBtn = document.querySelector(".profile__change-button");
export const popupChangeProfileNewName = popupChangeProfileForm.querySelector(".popup__input_type_username");
export const popupChangeProfileNewDescription = popupChangeProfileForm.querySelector(".popup__input_type_description");

// popup_type_add-element-card
export const addElementCardPopupSelector = ".popup_type_add-element-card"
export const popupAddElementCardForm = document.querySelector(".popup__form[name=add-element-card]");
export const popupAddElementCardOpenBtn = document.querySelector(".profile__add-button");
export const popupAddElementCardNewCardName = popupAddElementCardForm.querySelector(".popup__input_type_card-name");
export const popupAddElementCardNewCardLink = popupAddElementCardForm.querySelector(".popup__input_type_image-link");