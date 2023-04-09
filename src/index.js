import './pages/index.css';
import FormValidator from './js/components/FormValidator.js';
import { initialCards } from './js/cards.js';
import { editButton, userAddButton, cardsContainer, userName, userJobName, overlays, cardAddTemplate, profilePopup, itemName, jobName, imageLink, imageCaption, imageTemplate, cardName, cardLink } from './js/cards.js';
import {Card} from './js/components/Card.js';
import {Section} from './js/components/Section.js';
import { UserInfo } from './js/components/UserInfo.js';

import { PopupWithForm } from './js/components/PopupWithForm.js';
import { PopupWithImage } from './js/components/popupWithImage.js';
import { closePopup, openPopup } from './js/functions.js';

/* Используемые ноды */

const profileFormSelector = document.forms['form-user-profile'];
const cardFormSelector = document.forms['form-user-new'];

const profileForm = new PopupWithForm('.form-user-new');
const cardForm = new PopupWithForm('.card-add-form');

const handleOpenPopup = (name, link) => {
    const imagePopup = new PopupWithImage('.image-template', name, link);
    imagePopup.open();
}

/* Обработчики событий */

const openProfileForm = (evt) => {
    openPopup(profilePopup);

    const userNameContent = userName.textContent;
    const jobNameContent = userJobName.textContent;

    itemName.value = userNameContent;
    jobName.value = jobNameContent;
}

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();

    userName.textContent = itemName.value;
    userJobName.textContent = jobName.value;
    closePopup(profilePopup);
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
const newCardValidation = new FormValidator(settings, cardFormSelector);

/* Привязка слотов и сигналов, подписчиков */

profileForm.setEventListeners((evt) => {
    evt.preventDefault();
    
    userName.textContent = itemName.value;
    userJobName.textContent = jobName.value;
    closePopup(profilePopup);
});

/*
profileFormSelector.addEventListener('submit', handleProfileFormSubmit);
*/

const profileValidation = new FormValidator(settings, profileFormSelector);
profileValidation.enableValidation();
newCardValidation.enableValidation();

editButton.addEventListener('click', openProfileForm);
userAddButton.addEventListener('click', openCardForm);
cardForm.setEventListeners(
    (evt) => {
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
    });

/*
cardFormSelector.addEventListener('submit', handleCardAdd);
*/

/* Инициализация карточек */

document.addEventListener('DOMContentLoaded', function() {
    const section = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = createCard({name: item.name, link: item.link}, '#card-template', handleOpenPopup);
            const cardItem = card.addCard();
            return cardItem;
        }
    }, cardsContainer);
    section.renderElements();

    const user = new UserInfo(userName, userJobName);

    /*
    user.setUserInfo('Джон Смит', 'Просто Джон Смит');
    */
   
    /*
    initialCards.forEach(function(item) {

        const card = createCard({name: item.name, link: item.link}, '#card-template', handleOpenPopup);

        const cardItem = card.addCard();

        cardsContainer.append(cardItem);
    });
    */
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