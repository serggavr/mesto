// import popup from "../blocks/popup";

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const popupOpenBtn = document.querySelector('.profile__change-button');
const popupCloseBtn = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__form')
const popupTitle = document.querySelector('.popup__text-input_change_profile-title');
const popupSubtitle = document.querySelector('.popup__text-input_change_profile-subtitle');


function popupToggle() {
    popup.classList.toggle('popup_opened')
    popupTitle.value = profileTitle.innerText
    popupSubtitle.value = profileSubtitle.innerText
}

function changeProfileContent(event) {
  event.preventDefault();
  profileTitle.innerText = popupTitle.value
  profileSubtitle.innerText = popupSubtitle.value
  popupToggle()
}


popupOpenBtn.addEventListener('click', popupToggle)
popupCloseBtn.addEventListener('click', popupToggle)
popupForm.addEventListener('submit', changeProfileContent)
