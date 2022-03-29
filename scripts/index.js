// import popup from "../blocks/popup";

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const popupOpenBtn = document.querySelector('.profile__change-button');
const popupCloseBtn = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__form')
const popupTitle = document.querySelector('.popup__text-input_change_profile-title');
const popupSubtitle = document.querySelector('.popup__text-input_change_profile-subtitle');


function togglePopup() {
  popup.classList.toggle('popup_opened')
}

function openPopup() {
  togglePopup()
  popupTitle.value = profileTitle.textContent
  popupSubtitle.value = profileSubtitle.textContent
}

function changeProfileContent(event) {
  event.preventDefault();
  profileTitle.textContent = popupTitle.value
  profileSubtitle.textContent = popupSubtitle.value
  togglePopup()
}


popupOpenBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', togglePopup);
popupForm.addEventListener('submit', changeProfileContent);
