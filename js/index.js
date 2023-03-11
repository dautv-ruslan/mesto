import {openPopup, closePopup} from './functions.js';
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
const cardList = document.querySelector('.card__list');

const userName = document.querySelector('.user__name');
const userJobName = document.querySelector('.user__job-name');

const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_card-link');

const imageCaption = imageTemplate.querySelector('.popup__image-hint');
const imageLink = imageTemplate.querySelector('.popup__image');

/* Используемые функции */


/* Обработчики событий */

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    
    userName.textContent = itemName.value;
    userJobName.textContent = jobName.value;

    closePopup(profilePopup);
}

function openProfileForm(evt) {
    openPopup(profilePopup);

    const userNameContent = userName.textContent;
    const jobNameContent = userJobName.textContent;

    itemName.value = userNameContent;
    jobName.value = jobNameContent;
}

function openCardForm(evt) {
    openPopup(cardAddTemplate);
}

function handleCardAdd(evt) {
    evt.preventDefault();

    const submitButtonElement = evt.submitter;

    const card = new Card(cardName.value, cardLink.value, '#card-template');

    const cardItem = card.addCard();

    cardList.insertBefore(cardItem, cardList.firstChild);

    evt.target.reset();

    submitButtonElement.classList.remove('popup__submit_state_enabled');
    submitButtonElement.disabled = true;
    
    closePopup(cardAddTemplate);
}

const formInput = profileForm.querySelector('.popup__input');

/* Привязка слотов и сигналов, подписчиков */

profileForm.addEventListener('submit', handleProfileFormSubmit);
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

const forms = document.querySelectorAll(settings.formSelector);
forms.forEach(function(item) {
    const validationForm = new FormValidator(settings, item);
    validationForm.enableValidation();
})
editButton.addEventListener('click', openProfileForm);
userAddButton.addEventListener('click', openCardForm);
cardForm.addEventListener('submit', handleCardAdd);

/* Инициализация карточек */

document.addEventListener('DOMContentLoaded', function() {
    initialCards.forEach(function(item) {
        const card = new Card(item.name, item.link, '#card-template');

        const cardItem = card.addCard();

        cardList.append(cardItem);
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