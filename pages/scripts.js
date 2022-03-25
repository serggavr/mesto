// import popup from "../blocks/popup";

const popupOpenBtn = document.querySelector('.profile__change-button');
const popupCloseBtn = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupTitle = document.querySelector('.popup__text-input_change_profile-title');
let popupSubtitle = document.querySelector('.popup__text-input_change_profile-subtitle');
let popupSubmitBtn = document.querySelector('.popup__submit');
let popupForm = document.querySelector('.popup__form')
console.log(popupForm)

function popupToggle(event) {
  if (event.target === event.currentTarget) {
    popup.classList.toggle('popup_opened')
  }
}

function fillPopupText() {
  popupTitle.value = profileTitle.innerText
  popupSubtitle.value = profileSubtitle.innerText
}

function changeProfileText() {
  profileTitle.innerText = popupTitle.value
  profileSubtitle.innerText = popupSubtitle.value
}

function disableDefaultAction(event) {
  event.preventDefault();
  popup.classList.toggle('popup_opened')
}

popup.addEventListener('click', popupToggle)
popupOpenBtn.addEventListener('click', popupToggle)
popupOpenBtn.addEventListener('click', fillPopupText)
popupCloseBtn.addEventListener('click', popupToggle)
popupSubmitBtn.addEventListener('click', changeProfileText)
popupForm.addEventListener('submit', disableDefaultAction)
