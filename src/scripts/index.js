import css from '../pages/index.css'

import Card from './Card.js'
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import FormValidator from './FormValidator.js'
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import PopupConfirmation from './PopupConfirmation.js';

import {
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


////////////api///
import Api from './Api.js';

const groupId = "cohort-43"
const token = "56cfd0a1-6a89-41cf-9f3b-6d0765499e7a"
const baseUrl = `https://nomoreparties.co/v1/${groupId}`

const api = new Api({
  baseUrl,
  token,
  groupId
})

api.getUser().then(res => {
  userInfo.setUserInfo(res)
}).catch(err => console.log(err))


api.getCards().then(res => {
  cardsList.renderItems(res)
}).catch(err => console.log(err))

// const initialCards = api.getCards()
////////////api-end/////

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

const cardsList = new Section({
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item, cardTemplateSelector)
      cardsList.addItem(cardElement);
    }
  },
  cardsContainerSelector)


const CardPopup = new PopupWithImage(popupOverviewSelector)

const handlerCardClick = (cardPhoto, cardName, cardLink) => {
  cardPhoto.addEventListener("click", (e) => {
    CardPopup.open(cardName, cardLink)
  })
}

////////////////
const confirmationPopupSelector = ".popup_type_confirm"

const handlerCardDeleteBtnClick = (card) => {
  new PopupConfirmation({
      confirmedFunction: deleteCard
    },
    confirmationPopupSelector
  ).open(card)
}

function deleteCard(card) {
  card.deleteCard()
}

function createCard({
  name,
  link
}, templateSelector) {
  const newCard = new Card(name, link, templateSelector, {
    handlerCardClick: handlerCardClick,
    handlerCardDeleteBtnClick: handlerCardDeleteBtnClick
  }).createCard()
  return newCard
}

// const cardsList = new Section({
//     items: initialCards,
//     renderer: (item) => {
//       const cardElement = createCard(item, cardTemplateSelector)
//       cardsList.addItem(cardElement);
//     }
//   },
//   cardsContainerSelector)

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
  api.setUser({
    newName: formInputs.popup__input_type_username,
    newAbout: formInputs.popup__input_type_description
  }).then(data => {
    userInfo.setUserInfo({
      name: data.name,
      about: data.about
    })
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
    avatar: formInput['popup__input_type_avatar-link']
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