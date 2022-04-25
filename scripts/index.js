const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const cardsContainer = document.querySelector(".elements__list");
const popups = document.querySelectorAll(".popup")

// popup_type_change_profile
const popupChangeProfile = document.querySelector(".popup_type_change-profile");
const popupChangeProfileForm = document.querySelector(".popup__form[name=edit-profile]")
const popupChangeProfileOpenBtn = document.querySelector(".profile__change-button");
const popupChangeProfileNewName = document.querySelector(".popup__input_type_username");
const popupChangeProfileNewDescription = document.querySelector(".popup__input_type_description");

// popup_type_add-element-card
const popupAddElementCard = document.querySelector(".popup_type_add-element-card");
const popupAddElementCardForm = document.querySelector(".popup__form[name=add-element-card]")
const popupAddElementCardOpenBtn = document.querySelector(".profile__add-button");
const popupAddElementCardNewCardName = document.querySelector(".popup__input_type_card-name");
const popupAddElementCardNewCardLink = document.querySelector(".popup__input_type_image-link");

// popup_type_element-overview
const popupOverview = document.querySelector(".popup_type_element-overview");
const popupOverviewImage = document.querySelector(".overview__image");
const popupOverviewCaption = document.querySelector(".overview__caption");

// popup close buttons
const popupClosePopupsButtons = document.querySelectorAll(".popup__close-button");

// card template
const elementTemplate = document.querySelector("#element").content;

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


/** create element card
 * 
 * @param {string} name 
 * @param {string} link 
 * @returns {HTMLElement}
 */
function createCard(name, link) {
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  const elementPhoto = element.querySelector(".element__photo")
  const elementTitle = element.querySelector(".element__title")
  const elementDeleteBtn = element.querySelector(".element__delete-btn")
  const elementLikeBtn = element.querySelector(".element__like")

  elementPhoto.src = link;
  elementTitle.textContent = name;

  // delete card
  elementDeleteBtn.addEventListener("click", () => element.remove());

  // like card
  elementLikeBtn.addEventListener("click", (e) => e.target.classList.toggle("element__like_active"));

  // open card popup
  elementPhoto.addEventListener("click", (e) => {
    popupOverviewImage.src = link;
    popupOverviewImage.alt = name;
    popupOverviewCaption.textContent = name;
    document.addEventListener('keyup', closePopupOnKeyDown)
    popupOverview.addEventListener('click', closePopupOnClickOnOverlay)
    openPopup(popupOverview);
  });

  return element;
}

/** Add card to element__list
 * 
 * @param {Array} initialCards 
 */
function addCardsToCardsContainer(initialCards) {
  initialCards.forEach((elem) =>
    cardsContainer.append(createCard(elem.name, elem.link))
  );
}

/** Open popup 
 * 
 * @param {HTMLElement} popup
 */
function openPopup(popup) {
  popup.classList.add("popup_opened")
}

/** Close popups 
 * 
 * @param {HTMLElement} popup
 */
function closePopup(popup) {
  popup.classList.remove("popup_opened")
}


/** Fill with on load form inputs in change profile
 * 
 */
function fillOnLoadProfilePopup() {
  popupChangeProfileNewName.value = profileName.textContent;
  popupChangeProfileNewDescription.value = profileDescription.textContent;
}

/** Add value from profile to the popup__change_profile
 * 
 */
function openProfilePopup() {
  fillOnLoadProfilePopup()
  openPopup(popupChangeProfile);
}

/** Add value from popup__change_profile to the profile
 * 
 * @param {SubmitEvent} event 
 */
function changeProfileContent(event) {
  event.preventDefault();
  profileName.textContent = popupChangeProfileNewName.value;
  profileDescription.textContent = popupChangeProfileNewDescription.value;
  closePopup(popupChangeProfile);
}

/** Add new card to element__list
 * 
 * @param {SubmitEvent} event 
 */
function addNewCard(event) {
  event.preventDefault();
  cardsContainer.prepend(createCard(popupAddElementCardNewCardName.value, popupAddElementCardNewCardLink.value));
  closePopup(popupAddElementCard);
}

/** Cleans inputs in form
 * 
 * @param {HTMLFormElement} form 
 */
function clearFormInputs(form) {
  form.reset()
}

/** Close popup on key down 'Escape' and remove self listener
 * 
 */
function closePopupOnKeyDown() {
  if (event.key === "Escape") {
    popups.forEach((popup) => {
      popup.classList.remove('popup_opened')
    })
    document.removeEventListener('keyup', closePopupOnKeyDown)
  }
}

/** Close popup on 'click' on overlay and remove self listener
 * 
 */
function closePopupOnClickOnOverlay() {
  if (event.target === event.currentTarget) {
    closePopup(event.target)
    event.target.removeEventListener('click', closePopupOnClickOnOverlay)
  }
}


popupChangeProfileOpenBtn.addEventListener("click", () => {
  clearFormInputs(popupChangeProfileForm)
  document.addEventListener('keyup', closePopupOnKeyDown)
  popupChangeProfile.addEventListener('click', closePopupOnClickOnOverlay)
  openProfilePopup()
});

popupAddElementCardOpenBtn.addEventListener("click", () => {
  clearFormInputs(popupAddElementCardForm)
  document.addEventListener('keyup', closePopupOnKeyDown)
  popupAddElementCard.addEventListener('click', closePopupOnClickOnOverlay)
  openPopup(popupAddElementCard)
});

popupClosePopupsButtons.forEach((elem) => elem.addEventListener("click", () => {
  closePopup(elem.closest(".popup"))
}));

popupChangeProfileForm.addEventListener("submit", (event) => {
  changeProfileContent(event)
});

popupAddElementCardForm.addEventListener("submit", (event) => {
  addNewCard(event)
  popupAddElementCardForm.reset()
});

window.onload = () => {
  addCardsToCardsContainer(initialCards)
}