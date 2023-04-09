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