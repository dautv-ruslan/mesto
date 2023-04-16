/*
import url1 from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
import url2 from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg';
import url3 from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg';
import url4 from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg';
import url5 from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg';
import url6 from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg';

import url from '../../images/arkhyz.jpg';

const link = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
*/

export const initialCards = [
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

export const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_state_disabled",
    activeButtonClass: "popup__submit_state_enabled",
    inputTypeInvalidClass: "popup__input_type_invalid",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active"
};

export const profilePopup = document.querySelector('.profile-popup');

export const overlays = document.querySelectorAll('.popup');
export const editButton = document.querySelector('.user__edit-button');
export const userAddButton = document.querySelector('.user__add-button');

export const itemName = document.querySelector('.popup__input_type_item-name');
export const jobName = document.querySelector('.popup__input_type_item-job-name');
export const cardAddTemplate = document.querySelector('.card-add-template');
export const imageTemplate = document.querySelector('.image-template');
export const cardsContainer = document.querySelector('.card__list');

export const userName = document.querySelector('.user__name');
export const userJobName = document.querySelector('.user__job-name');

export const cardName = document.querySelector('.popup__input_type_card-name');
export const cardLink = document.querySelector('.popup__input_type_card-link');

export const imageCaption = imageTemplate.querySelector('.popup__image-hint');
export const imageLink = imageTemplate.querySelector('.popup__image');