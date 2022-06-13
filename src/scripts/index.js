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
  baseUrl,
  token,
  groupId
})

const getUser = () => api.getUser().then(res => {
  userInfo.setUserInfo(res)
  return res
}).catch(err => console.log(err))

const getCard = () => api.getCards().then(res => {
  cardsList.renderItems(res)
}).catch(err => console.log(err))

Promise.all([getUser()]).then((res) => {
  getCard()
}).catch(err => console.log(err))

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

const popupConfirmation = new PopupConfirmation({
    confirmedFunction: deleteCard
  },
  confirmationPopupSelector
)
popupConfirmation.setEventListeners()

const handlerCardDeleteBtnClick = (card) => {
  popupConfirmation.open(card)
}

function deleteCard(card, submitButton) {
  // submitButton.value = "Удаление..."
  api.deleteCard(card.id).then((res) => {
      card.deleteCard()
      popupConfirmation.close()
    })
    .finally(res => this.setSubmitButtonTextContent("Да"))
    .catch(err => console.log(err))
}

const handlerCardLikeBtnClick = (card) => {
  if (!card.isLiked(userInfo.userId)) {
    api.likeCard(card.id)
      .then((res) => {
        card.likeCard()
        card.updateLikes(res.likes)
      })
      .catch(err => console.log(err))
  } else {
    api.dislikeCard(card.id)
      .then((res) => {
        card.likeCard()
        card.updateLikes(res.likes)
      })
      .catch(err => console.log(err))
  }
}


function userLikesThisCard(userId, likes) {
  let isLiked
  likes.forEach((liker) => {
    if (userId === liker._id) {
      isLiked = true
    }
  })
  return isLiked
}

function createCard({
  name,
  link,
  likes,
  _id,
  owner
}, templateSelector) {
  // const isOwner = owner._id === userInfo.userId
  const newCard = new Card({
    name: name,
    link: link,
    likes: likes,
    _id: _id,
    owner: owner
  }, templateSelector, {
    handlerCardClick: handlerCardClick,
    handlerCardDeleteBtnClick: handlerCardDeleteBtnClick,
    handlerCardLikeBtnClick: handlerCardLikeBtnClick
  }).createCard(userInfo.userId)
  // userLikesThisCard(userInfo.userId, likes)
  // console.log(newCard)
  return newCard
}

function fillOnLoadProfilePopup() {
  const {
    name,
    about
  } = userInfo.getUserInfo()
  popupChangeProfileNewName.value = name
  popupChangeProfileNewDescription.value = about
}

const changeProfileContent = (formInputs, submitButton) => {
  submitButton.value = "Сохранение..."
  api.setUser({
    newName: formInputs.popup__input_type_username,
    newAbout: formInputs.popup__input_type_description
  }).then(data => {
    submitButton.value = "Сохранить"
    userInfo.setUserInfo({
      name: data.name,
      about: data.about
    }).catch(err => console.log(err))
  })
}

const addNewCard = (newCard, submitButton) => {
  submitButton.value = "Сохранение..."
  api.setCard({
    cardName: newCard[`popup__input_type_card-name`],
    cardLink: newCard[`popup__input_type_image-link`]
  }).then(data => {
    cardsList.addItemToTopOfList(createCard({
      name: data.name,
      link: data.link,
      likes: [],
      _id: data._id,
      owner: userInfo.getUserInfo()
    }, cardTemplateSelector))
    submitButton.value = "Создать"
  }).catch(err => console.log(err))
}

const updateAvatar = (formInput, submitButton) => {
  submitButton.value = "Сохранение..."
  userInfo.setUserInfo({
    avatar: formInput['popup__input_type_avatar-link']
  })
  api.setUserAvatar(formInput['popup__input_type_avatar-link']).then((res) => {
    submitButton.value = "Сохранить"
  }).catch(err => console.log(err))
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

console.log(popupChangeProfileAvatar)

profileAvatarChangeBtn.addEventListener('click', () => {
  popupUpdateAvatarFormValidation.clearFormInputsErrors()
  popupChangeProfileAvatar.open()
})