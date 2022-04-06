const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const popupOpenBtn = document.querySelector('.profile__change-button');
const popupCloseBtn = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__form')
const popupTitle = document.querySelector('.popup__text-input_change_profile-title');
const popupSubtitle = document.querySelector('.popup__text-input_change_profile-subtitle');
const elementList = document.querySelector('.elements__list')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

  
function createCard(name, link) {
    const elementTemplate = document.querySelector('#element').content;
    const element = elementTemplate.querySelector('.element').cloneNode(true);

    element.querySelector('.element__photo').src = link;
    element.querySelector('.element__photo').alt = name;
    element.querySelector('.element__title').textContent = name;

    // Для удаления, назначить на кнопку удаления, пока повесил на element if title
    element.querySelector('.element__title').addEventListener('click', (e) => {
      e.target.closest('.element').remove()
    })
    //

    // Для лайков
    element.querySelector('.element__like').addEventListener('click', (e) => {
      e.target.classList.toggle('element__like_active')
    })
    //

    // Для popup
    element.querySelector('.element__photo').addEventListener('click', (e) => {

    })
    //

    return element
};

function addElementToList(arr) {
  arr.forEach((elem) => {
    elementList.appendChild(createCard(elem.name, elem.link))
  })
}

function togglePopup() {
  popup.classList.toggle('popup_opened')
}

function openPopup() {
  popupTitle.value = profileTitle.textContent
  popupSubtitle.value = profileSubtitle.textContent
  togglePopup()
}

function changeProfileContent(event) {
  event.preventDefault();
  profileTitle.textContent = popupTitle.value
  profileSubtitle.textContent = popupSubtitle.value
  togglePopup()
}

window.onload = function() {
  addElementToList(initialCards)
}


popupOpenBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', togglePopup);
popupForm.addEventListener('submit', changeProfileContent);