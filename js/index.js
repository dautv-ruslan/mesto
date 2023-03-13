import FormValidator from './FormValidator.js';
import {Card} from './Card.js';

/* Используемые ноды */

const profileForm = document.forms['form-user-profile'];
const cardForm = document.forms['form-user-new'];

const profilePopup = document.querySelector('.profile-popup');

const overlays = document.querySelectorAll('.popup');
const editButton = document.querySelector('.user__edit-button');
const userAddButton = document.querySelector('.user__add-button');

const itemName = document.querySelector('.popup__input_type_item-name');
const jobName = document.querySelector('.popup__input_type_item-job-name');
const cardAddTemplate = document.querySelector('.card-add-template');
const imageTemplate = document.querySelector('.image-template');
const cardsContainer = document.querySelector('.card__list');

const userName = document.querySelector('.user__name');
const userJobName = document.querySelector('.user__job-name');

const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_card-link');

const imageCaption = imageTemplate.querySelector('.popup__image-hint');
const imageLink = imageTemplate.querySelector('.popup__image');

/* Используемые функции */

const closePopup = (item) => {
    item.classList.remove('popup_state-opened');
    document.removeEventListener('keydown', closeOnEscapeButtonClick);
}

const closeOnEscapeButtonClick = (evt) => {
    if (evt.code == 'Escape') {
        const openedPopup = document.querySelector('.popup_state-opened');
        closePopup(openedPopup);
    }
}

const openPopup = (item) => {
    item.classList.add('popup_state-opened');
    document.addEventListener('keydown', closeOnEscapeButtonClick);
}

const handleOpenPopup = (name, link) => {
    imageLink.src = link;
    imageLink.setAttribute('alt', name);
    imageCaption.innerText = name;
    openPopup(imageTemplate);
}

/* Обработчики событий */

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    
    userName.textContent = itemName.value;
    userJobName.textContent = jobName.value;

    closePopup(profilePopup);
}

const openProfileForm = (evt) => {
    openPopup(profilePopup);

    const userNameContent = userName.textContent;
    const jobNameContent = userJobName.textContent;

    itemName.value = userNameContent;
    jobName.value = jobNameContent;
}

const openCardForm = (evt) => {
    openPopup(cardAddTemplate);
}

const createCard = (data, template, callback) => {
    const card = new Card(data, template, callback);
    return card;
}

const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_state_disabled",
    activeButtonClass: "popup__submit_state_enabled",
    inputTypeInvalidClass: "popup__input_type_invalid",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active"
};
const newCardValidation = new FormValidator(settings, cardForm);

const handleCardAdd = (evt) => {
    evt.preventDefault();

    const submitButtonElement = evt.submitter;

    const data = {
        name: cardName.value,
        link: cardLink.value
    }

    const card = createCard(data, '#card-template', handleOpenPopup);

    const cardItem = card.addCard();

    cardsContainer.prepend(cardItem);

    evt.target.reset();

    newCardValidation.hideSubmitButton(submitButtonElement, settings.activeButtonClass);
    
    closePopup(cardAddTemplate);
}

/* Привязка слотов и сигналов, подписчиков */

profileForm.addEventListener('submit', handleProfileFormSubmit);

const profileValidation = new FormValidator(settings, profileForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();

editButton.addEventListener('click', openProfileForm);
userAddButton.addEventListener('click', openCardForm);
cardForm.addEventListener('submit', handleCardAdd);

/* Инициализация карточек */

document.addEventListener('DOMContentLoaded', function() {
    initialCards.forEach(function(item) {

        const card = createCard({name: item.name, link: item.link}, '#card-template', handleOpenPopup);

        const cardItem = card.addCard();

        cardsContainer.append(cardItem);
    });
    overlays.forEach(function(item) {
        item.addEventListener('mousedown', function(evt) {
            if (evt.target.classList.contains('popup_state-opened')) {
                closePopup(item);
            }
            if (evt.target.classList.contains('popup__close-icon')) {
                closePopup(item);
            }
        })
    });
})