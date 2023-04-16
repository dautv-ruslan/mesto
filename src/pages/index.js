import './index.css';
import FormValidator from '../js/components/FormValidator.js';
import { initialCards } from '../js/utils/constants.js';
import { editButton, userAddButton, cardsContainer, userName, userJobName, overlays, cardAddTemplate, profilePopup, itemName, jobName, imageLink, imageCaption, imageTemplate, cardName, cardLink } from '../js/cards.js';
import {Card} from '../js/components/Card.js';
import {Section} from '../js/components/Section.js';
import { UserInfo } from '../js/components/UserInfo.js';
import { settings } from '../js/utils/constants.js';

import { PopupWithForm } from '../js/components/PopupWithForm.js';
import { PopupWithImage } from '../js/components/popupWithImage.js';
import { closeOnEscapeButtonClick, closePopup, openPopup } from '../js/functions.js';

/* Используемые ноды */

const profileFormSelector = document.forms['form-user-profile'];
const cardFormSelector = document.forms['form-user-new'];

const imagePopup = new PopupWithImage('.image-template');

imagePopup.setEventListeners();

const user = new UserInfo('.user__name', '.user__job-name');
const userData = user.getUserInfo();

const newCardValidation = new FormValidator(settings, cardFormSelector);

const profileForm = new PopupWithForm(
    '.profile-popup',
    (evt) => {
        evt.preventDefault();
        
        userName.textContent = itemName.value;
        userJobName.textContent = jobName.value;
        closePopup(profilePopup);
    }
);
const cardForm = new PopupWithForm(
    '.card-add-template',
    (evt) => {
        evt.preventDefault();
        
        const submitButtonElement = evt.submitter;

        const card = new Card({
                name: cardName.value,
                link: cardLink.value
            }, 
            '#card-template', handleOpenPopup
        );

        const cardItem = card.generateCard();
    
        cardsContainer.prepend(cardItem);
    
        evt.target.reset();
    
        newCardValidation.disableSubmitButton();
        
        closePopup(cardAddTemplate);
    }
);

const handleOpenPopup = (name, link) => {
    // imagePopup.open(name, link);
    document.querySelector('.image-template').classList.add('popup_state-opened');
    imageLink.src = link;
    imageLink.setAttribute('alt', name);
    imageCaption.innerText = name;
    document.addEventListener('keydown', closeOnEscapeButtonClick);
}

/* Обработчики событий */

const openProfileForm = (evt) => {
    /*
    openPopup(profilePopup);
    */

    profileForm.open();

    itemName.value = userData.userName;
    jobName.value = userData.aboutMe;
}

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();

    userName.textContent = itemName.value;
    userJobName.textContent = jobName.value;
    cardForm.open();
}

const openCardForm = (evt) => {
    /*
    openPopup(cardAddTemplate);
    */

    cardForm.open();
}

const createCard = (data, template, callback) => {
    return new Card(data, template, callback);
}

/* Привязка слотов и сигналов, подписчиков */

profileForm.setEventListeners((evt) => {
    evt.preventDefault();
    user.setUserInfo(itemName.value, jobName.value)
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
cardForm.setEventListeners();

/*
cardFormSelector.addEventListener('submit', handleCardAdd);
*/

/* Инициализация карточек */

const section = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({name: item.name, link: item.link}, '#card-template', handleOpenPopup);
        const cardItem = card.generateCard();
        return cardItem;
    }
}, '.card__list');
section.renderElements();

user.setUserInfo('Джон Смит', 'Просто Джон Смит');

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
