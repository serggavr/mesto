const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elementList = document.querySelector('.elements__list')

// popup_change_profile
const popupChangeProfile = document.querySelector('.popup_change_profile');
const popupChangeProfileOpenBtn = document.querySelector('.profile__change-button');
const popupChangeProfileNewTitle = document.querySelector('.popup__text-input_change_profile-title');
const popupChangeProfileNewSubtitle = document.querySelector('.popup__text-input_change_profile-subtitle');

// popup_add_element-card
const popupAddElementCard = document.querySelector('.popup_add_element-card')
const popupAddElementCardOpenBtn = document.querySelector('.profile__add-button')
const popupAddElementCardNewCardName = document.querySelector('.popup__text-input_add_element-card-name')
const popupAddElementCardNewCardLink = document.querySelector('.popup__text-input_add_element-card-image-link')

// popup_element-overview
const popupOverview = document.querySelector('.popup_element-overview')
const popupOverviewImage = document.querySelector('.overview__image')
const popupOverviewCaption = document.querySelector('.overview__caption')

// popup buttons & popup forms
const popupClosePopupButtons = document.querySelectorAll('.popup__close-button');
const popupForms = document.querySelectorAll('.popup__form')


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

// create element card
function createCard(name, link) {
  const elementTemplate = document.querySelector('#element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  element.querySelector('.element__photo').src = link;
  element.querySelector('.element__photo').alt = name;
  element.querySelector('.element__title').textContent = name;

  // delete element
  element.querySelector('.element__delete-btn').addEventListener('click', () => element.remove())

  // like element
  element.querySelector('.element__like').addEventListener('click', (e) => e.target.classList.toggle('element__like_active'))

  // open element popup
  element.querySelector('.element__photo').addEventListener('click', (e) => {
    popupOverviewImage.src = link;
    popupOverviewCaption.textContent = name;
    togglePopup(e)
  })

  return element
};

//add elements to element__list
function addElementToList(arr) {
  arr.forEach((elem) => {
    elementList.appendChild(createCard(elem.name, elem.link))
  })
}

// open/close popups
function togglePopup(event) {
  // edit profile popup
  if (event.target === popupChangeProfileOpenBtn) {
    popupChangeProfile.classList.toggle('popup_opened')
  }
  // add element popup
  if (event.target === popupAddElementCardOpenBtn) {
    popupAddElementCard.classList.toggle('popup_opened')
  }
  // element overview popup
  if (event.target.classList.value === 'element__photo') {
    popupOverview.classList.toggle('popup_opened')
  } else {
    // close popup
    event.target.closest('.popup').classList.toggle('popup_opened')
  }
}

// add value from profile to the popup__change_profile
function openChangeProfilePopup(event) {
  popupChangeProfileNewTitle.value = profileTitle.textContent
  popupChangeProfileNewSubtitle.value = profileSubtitle.textContent
  togglePopup(event)
}

// add value from popup__change_profile to the profile
function changeProfileContent(title, subtitle) {
  profileTitle.textContent = title;
  profileSubtitle.textContent = subtitle;
}

// submit forms
function submitPopupForm(event) {
  event.preventDefault();
  if (event.target.name === "edit-profile") changeProfileContent(popupChangeProfileNewTitle.value, popupChangeProfileNewSubtitle.value);
  if (event.target.name === "add-element-card") addNewElementCard(popupAddElementCardNewCardName.value, popupAddElementCardNewCardLink.value);
  togglePopup(event);
}

// add new element from popup_add_element-card
function addNewElementCard(name, link) {
  elementList.insertBefore(createCard(name, link), elementList.firstChild)
}

popupChangeProfileOpenBtn.addEventListener('click', openChangeProfilePopup);
popupAddElementCardOpenBtn.addEventListener('click', togglePopup);
popupClosePopupButtons.forEach((elem) => elem.addEventListener('click', togglePopup));
popupForms.forEach((elem) => elem.addEventListener('submit', submitPopupForm));

window.onload = function () {
  addElementToList(initialCards)
}