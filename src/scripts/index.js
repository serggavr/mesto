import css from '../pages/index.css'

import Card from './Card.js'
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import FormValidator from './FormValidator.js'
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

import {
  initialCards,
  validatorSelectors,
  profileNameSelector,
  cardTemplateSelector,
  cardsContainerSelector,
  profileDescriptionSelector,
  profileAvatarSelector,
  popupOverviewSelector,
  changeProfilePopupSelector,
  popupChangeProfileForm,
  popupChangeProfileOpenBtn,
  popupChangeProfileNewName,
  popupChangeProfileNewDescription,
  addElementCardPopupSelector,
  popupAddElementCardForm,
  popupAddElementCardOpenBtn,
  popupAddElementCardNewCardName,
  popupAddElementCardNewCardLink
} from "../utils/constants.js"

//enable validation popupChangeProfileForm
const popupChangeProfileFormValidation = new FormValidator(validatorSelectors, popupChangeProfileForm)
popupChangeProfileFormValidation.enableValidation()

//enable validation popupAddElementCardForm
const popupAddElementCardFormValidation = new FormValidator(validatorSelectors, popupAddElementCardForm)
popupAddElementCardFormValidation.enableValidation()

const userInfo = new UserInfo({
  userNameSelector: profileNameSelector,
  userDescriptionSelector: profileDescriptionSelector,
  userAvatarSelector: profileAvatarSelector //////
})

const CardPopup = new PopupWithImage(popupOverviewSelector)

const handleCardClick = (cardPhoto, cardName, cardLink) => {
  cardPhoto.addEventListener("click", (e) => {
    CardPopup.open(cardName, cardLink)
  })
}

function createCard({
  name,
  link
}, templateSelector) {
  const newCard = new Card(name, link, templateSelector, {
    handleCardClick: handleCardClick
  }).createCard()
  return newCard
}

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, cardTemplateSelector)
      cardsList.addItem(cardElement);
    }
  },
  cardsContainerSelector)

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
const addNewCard = (
  newCard
) => {
  cardsList.addItemToTopOfList(createCard({
    name: newCard[`popup__input_type_card-name`],
    link: newCard[`popup__input_type_image-link`]
  }, cardTemplateSelector));
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
  }, addElementCardPopupSelector)

  popupAddElementCardFormValidation.clearFormInputsErrors()
  popup.open()
});

///////////Замена аватара
// const profileAvatar = document.querySelector('.profile__avatar')
const profileAvatarChangeBtn = document.querySelector('.profile__avatar_change-button')
const updateAvatarPopupSelector = ".popup_type_update-avatar"
const popupUpdateAvatarForm = document.querySelector(".popup__form[name=update-avatar]");

const popupUpdateAvatarFormValidation = new FormValidator(validatorSelectors, popupUpdateAvatarForm)
popupUpdateAvatarFormValidation.enableValidation()

const updateAvatar = (formInput) => {
  userInfo.setUserInfo({
    newUserAvatarImageSrc: formInput['popup__input_type_avatar-link']
  })
}

profileAvatarChangeBtn.addEventListener('click', () => {
  const popup = new PopupWithForm({
    submitForm: updateAvatar
  }, updateAvatarPopupSelector)
  popup.open()
})
//////////Замена аватара //// end

cardsList.renderItems()