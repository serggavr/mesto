const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const cardsList = document.querySelector(".elements__list");

// popup_type_change_profile
const popupChangeProfile = document.querySelector(".popup_type_change-profile");
const popupChangeProfileForm = document.querySelector('.popup__form[name=edit-profile]')
const popupChangeProfileOpenBtn = document.querySelector(".profile__change-button");
const popupChangeProfileNewName = document.querySelector(".popup__text-input_type_username");
const popupChangeProfileNewDescription = document.querySelector(".popup__text-input_type_description");

// popup_type_add-element-card
const popupAddElementCard = document.querySelector(".popup_type_add-element-card");
const popupAddElementCardForm = document.querySelector('.popup__form[name=add-element-card]')
const popupAddElementCardOpenBtn = document.querySelector(".profile__add-button");
const popupAddElementCardNewCardName = document.querySelector(".popup__text-input_type_card-name");
const popupAddElementCardNewCardLink = document.querySelector(".popup__text-input_type_image-link");

// popup_type_element-overview
const popupOverview = document.querySelector(".popup_type_element-overview");
const popupOverviewImage = document.querySelector(".overview__image");
const popupOverviewCaption = document.querySelector(".overview__caption");

// popup close buttons 
const popupClosePopupButtons = document.querySelectorAll(".popup__close-button");

const initialCards = [{
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// create element card
function createCard(name, link) {
  const elementTemplate = document.querySelector("#element").content;
  const element = elementTemplate.querySelector(".element").cloneNode(true);

  element.querySelector(".element__photo").src = link;
  element.querySelector(".element__photo").alt = name;
  element.querySelector(".element__title").textContent = name;

  // delete card
  element.querySelector(".element__delete-btn").addEventListener("click", () => element.remove());

  // like card
  element.querySelector(".element__like").addEventListener("click", (e) => e.target.classList.toggle("element__like_active"));

  // open card popup
  element.querySelector(".element__photo").addEventListener("click", (e) => {
    popupOverviewImage.src = link;
    popupOverviewImage.alt = name;
    popupOverviewCaption.textContent = name;
    togglePopup(popupOverview);
  });

  return element;
}

//add card to element__list
function addCardsToCardsList(initialCards) {
  initialCards.forEach((elem) =>
    cardsList.appendChild(createCard(elem.name, elem.link))
  );
}

// open/close popups
function togglePopup(popup) {
  popup.classList.toggle("popup_opened")
}

// add value from profile to the popup__change_profile
function openProfilePopup() {
  popupChangeProfileNewName.value = profileName.textContent;
  popupChangeProfileNewDescription.value = profileDescription.textContent;
  togglePopup(popupChangeProfile);
}

// add value from popup__change_profile to the profile
function changeProfileContent(event) {
  event.preventDefault();
  profileName.textContent = popupChangeProfileNewName.value;
  profileDescription.textContent = popupChangeProfileNewDescription.value;
  togglePopup(popupChangeProfile);
}

// add new card to element__list
function addNewCard(event) {
  event.preventDefault();
  cardsList.prepend(createCard(popupAddElementCardNewCardName.value, popupAddElementCardNewCardLink.value));
  popupAddElementCardForm.reset();
  togglePopup(popupAddElementCard);
}

popupChangeProfileOpenBtn.addEventListener("click", openProfilePopup);
popupAddElementCardOpenBtn.addEventListener("click", () => togglePopup(popupAddElementCard));
popupClosePopupButtons.forEach((elem) => elem.addEventListener("click", () => togglePopup(elem.closest(".popup"))));
popupChangeProfileForm.addEventListener('submit', changeProfileContent);
popupAddElementCardForm.addEventListener('submit', addNewCard);

window.onload = function () {
  addCardsToCardsList(initialCards);
};