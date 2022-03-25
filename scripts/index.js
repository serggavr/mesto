// import popup from "../blocks/popup";

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const popupOpenBtn = document.querySelector('.profile__change-button');
const popupCloseBtn = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__form')
const popupTitle = document.querySelector('.popup__text-input_change_profile-title');
const popupSubtitle = document.querySelector('.popup__text-input_change_profile-subtitle');
const popupSubmitBtn = document.querySelector('.popup__submit');


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
