const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopupOpenBtn = document.querySelector('.profile__change-button');
const addElementPopupOpenBtn = document.querySelector('.profile__add-button');
const elementList = document.querySelector('.elements__list')

const initialCards = [{
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
  element.querySelector('.element__delete-btn').addEventListener('click', () => element.remove())
  element.querySelector('.element__like').addEventListener('click', (e) => {
    e.target.classList.toggle('element__like_active')
  })
  element.querySelector('.element__photo').addEventListener('click', (e) => {
    openPopup(e)
  })
  return element
};

function createPopupWithImage(e) {
  const popupTemplate = document.querySelector('.popup-template__with-image').content;
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);
  const popupImage = popup.querySelector('.popup-img__image');
  const popupImageCaption = popup.querySelector('.popup-img__caption');
  const popupCloseBtn = popup.querySelector('.popup__close-button');
  popupImage.src = e.target.src
  popupImageCaption.textContent = e.target.alt

  popupCloseBtn.addEventListener('click', () => {
    togglePopup(popup)

  })
  togglePopup(popup)
  return popup
}

function createPopupWithForm(e) {
  const popupTemplate = document.querySelector('.popup-template__with-form').content;
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);
  const popupForm = popup.querySelector('.popup__form');
  const popupTitle = popupForm.querySelector('.popup__title');
  const popupFirstInput = popupForm.querySelector('.popup__text-input_first');
  const popupSecondInput = popupForm.querySelector('.popup__text-input_second');
  const popupSubmitBtn = popupForm.querySelector('.popup__submit');
  const popupCloseBtn = popup.querySelector('.popup__close-button');

  if (e.target === profilePopupOpenBtn) {
    popupForm.name = "edit-profile";
    popupTitle.textContent = "Редактировать профиль";
    popupFirstInput.placeholder = "Имя";
    popupFirstInput.value = profileTitle.textContent;
    popupSecondInput.placeholder = "Специализация";
    popupSecondInput.value = profileSubtitle.textContent;
    popupSubmitBtn.value = "Сохранить";

    popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      profileTitle.textContent = popupFirstInput.value;
      profileSubtitle.textContent = popupSecondInput.value;
      togglePopup(popup);
    })
  }

  if (e.target === addElementPopupOpenBtn) {
    popupForm.name = "add-element";
    popupTitle.textContent = "Новое место";
    popupFirstInput.placeholder = "Название";
    popupSecondInput.placeholder = "Ссылка на картинку";
    popupSubmitBtn.value = "Создать";

    popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      elementList.insertBefore(createCard(popupFirstInput.value, popupSecondInput.value), elementList.firstChild)
      togglePopup(popup);
    })
  }

  popupCloseBtn.addEventListener('click', () => togglePopup(popup))
  togglePopup(popup)
  return popup
};

function openPopup(e) {
  if (e.target === profilePopupOpenBtn || e.target === addElementPopupOpenBtn) {
    document.querySelector('body').appendChild(createPopupWithForm(e))
  } else {
    document.querySelector('body').appendChild(createPopupWithImage(e))
  }
}

function addElementToList(arr) {
  arr.forEach((elem) => {
    elementList.appendChild(createCard(elem.name, elem.link))
  })
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened')
}

window.onload = function () {
  addElementToList(initialCards)
}

profilePopupOpenBtn.addEventListener('click', openPopup);
addElementPopupOpenBtn.addEventListener('click', openPopup);