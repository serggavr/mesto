import css from '../pages/index.css'

import Card from './Card.js'
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import FormValidator from './FormValidator.js'
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import PopupConfirmation from './PopupConfirmation.js';
import Api from './Api.js';

import {
  groupId,
  token,
  baseUrl,
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
  confirmationPopupSelector,
  profileAvatarChangeBtn,
  updateAvatarPopupSelector,
  popupUpdateAvatarForm,
} from "../utils/constants.js"

const api = new Api({
  baseUrl: `${baseUrl}${groupId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
})

Promise.all([
    api.getUser(),
    api.getCards()
  ])
  .then(([info, cards]) => {
    userInfo.setUserInfo(info)
    cardsList.renderItems(cards)
  })
  .catch(err => console.log(err))

//enable validation popupChangeProfileForm
const popupChangeProfileFormValidation = new FormValidator(validatorSelectors, popupChangeProfileForm)
popupChangeProfileFormValidation.enableValidation()

//enable validation popupAddElementCardForm
const popupAddElementCardFormValidation = new FormValidator(validatorSelectors, popupAddElementCardForm)
popupAddElementCardFormValidation.enableValidation()

//enable validation popupUpdateAvatarForm
const popupUpdateAvatarFormValidation = new FormValidator(validatorSelectors, popupUpdateAvatarForm)
popupUpdateAvatarFormValidation.enableValidation()

const userInfo = new UserInfo({
  userNameSelector: profileNameSelector,
  userDescriptionSelector: profileDescriptionSelector,
  userAvatarSelector: profileAvatarSelector
})

const cardsList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item, cardTemplateSelector)
    cardsList.addItem(cardElement);
  }
}, cardsContainerSelector)

const createCard = (card, templateSelector) => {
  const newCard = new Card({
    ...card
  }, templateSelector, {
    handlerCardClick: handlerCardClick,
    handlerCardDeleteBtnClick: handlerCardDeleteBtnClick,
    handlerCardLikeBtnClick: handlerCardLikeBtnClick
  }).createCard(userInfo.userId)
  return newCard
}

const addNewCard = (newCard) => {
  popupAddElementCard.setSubmitButtonTextContent("Сохранение...")
  api.setCard({
      cardName: newCard[`popup__input_type_card-name`],
      cardLink: newCard[`popup__input_type_image-link`]
    })
    .then(newCard => {
      console.log(newCard)
      cardsList.addItemToTopOfList(createCard({
        ...newCard
      }, cardTemplateSelector))
    })
    .then(() => popupAddElementCard.close())
    .finally(() => popupAddElementCard.setSubmitButtonTextContent("Создать"))
    .catch(err => console.log(err))
}

function deleteCard(card) {
  popupConfirmation.setSubmitButtonTextContent("Удаление...")
  api.deleteCard(card.id)
    .then(() => card.deleteCard())
    .then(() => popupConfirmation.close())
    .finally(() => popupConfirmation.setSubmitButtonTextContent("Да"))
    .catch(err => console.log(err))
}

const handlerCardClick = (cardPhoto, cardName, cardLink) => {
  cardPhoto.addEventListener("click", (e) => {
    cardPopup.open(cardName, cardLink)
  })
}

const handlerCardDeleteBtnClick = (card) => {
  popupConfirmation.open(card)
}

const handlerCardLikeBtnClick = (card) => {
  if (!card.isLiked(userInfo.userId)) {
    api.likeCard(card.id)
      .then(res => card.updateLikes(res.likes))
      .catch(err => console.log(err))
  } else {
    api.dislikeCard(card.id)
      .then(res => card.updateLikes(res.likes))
      .catch(err => console.log(err))
  }
}

const fillOnLoadProfilePopup = () => {
  const {
    name,
    about
  } = userInfo.getUserInfo()
  popupChangeProfileNewName.value = name
  popupChangeProfileNewDescription.value = about
}

const changeProfileContent = (formInputs) => {
  popupChangeProfile.setSubmitButtonTextContent("Сохранение...")
  api.setUser({
      newName: formInputs.popup__input_type_username,
      newAbout: formInputs.popup__input_type_description
    }).then(data => {
      userInfo.setUserInfo({
        ...data
      })
    })
    .then(() => popupChangeProfile.close())
    .finally(() => popupChangeProfile.setSubmitButtonTextContent("Сохранить"))
    .catch(err => console.log(err))
}

const updateAvatar = (formInput) => {
  popupChangeProfileAvatar.setSubmitButtonTextContent("Сохранение...")
  api.setUserAvatar(formInput['popup__input_type_avatar-link'])
    .then(() => {
      userInfo.setUserInfo({
        avatar: formInput['popup__input_type_avatar-link']
      })
      popupChangeProfileAvatar.close()
    })
    .finally(() => popupChangeProfileAvatar.setSubmitButtonTextContent("Создать"))
    .catch(err => console.log(err))
}

const popupChangeProfile = new PopupWithForm({
  submitForm: changeProfileContent
}, changeProfilePopupSelector)
popupChangeProfile.setEventListeners()

popupChangeProfileOpenBtn.addEventListener("click", () => {
  fillOnLoadProfilePopup();
  popupChangeProfileFormValidation.clearFormInputsErrors()
  popupChangeProfile.open()
});

const popupAddElementCard = new PopupWithForm({
  submitForm: addNewCard
}, addElementCardPopupSelector)
popupAddElementCard.setEventListeners()

popupAddElementCardOpenBtn.addEventListener("click", () => {
  popupAddElementCardFormValidation.clearFormInputsErrors()
  popupAddElementCard.open()
});

const popupChangeProfileAvatar = new PopupWithForm({
  submitForm: updateAvatar
}, updateAvatarPopupSelector)
popupChangeProfileAvatar.setEventListeners()

profileAvatarChangeBtn.addEventListener('click', () => {
  popupUpdateAvatarFormValidation.clearFormInputsErrors()
  popupChangeProfileAvatar.open()
})

const cardPopup = new PopupWithImage(popupOverviewSelector)
cardPopup.setEventListeners()

const popupConfirmation = new PopupConfirmation({
  confirmedFunction: deleteCard
}, confirmationPopupSelector)
popupConfirmation.setEventListeners()