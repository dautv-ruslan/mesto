const initialCards = [
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

let form = document.querySelector(".form");
let fPopup = document.querySelector('.popup');
let fPopupContainer = document.querySelector('.popup__container');
let closeIcon = document.querySelector('.popup__close-icon');
let editButton = document.querySelector('.user__edit-button');
let likeButton = document.querySelectorAll('.card__heart-icon');
let cardButton = document.querySelectorAll('.card__button');
let userAddButton = document.querySelector('.user__add-button');

let itemName = document.querySelector('.form__input_type_item-name');
let jobName = document.querySelector('.form__input_type_item-job-name');
const cardTemplate = document.querySelector('#card-template').content;
const profileTemplate = document.querySelector('#profile-template').content;
const cardAddTemplate = document.querySelector('#card-add-template').content;
const imageTemplate = document.querySelector('#image-template').content;
let cardList = document.querySelector('.card__list');

function handleFormSubmit(evt) {
    evt.preventDefault();

    document.querySelector('.user__name').textContent = itemName.value;
    document.querySelector('.user__job-name').textContent = jobName.value;

    fPopup.classList.add('popup_state-closed');
}

function handleFormClose(evt) {
    fPopup.classList.add('popup_state-closed');
}

function handleFormOpen(evt) {
    fPopup.classList.remove('popup_state-closed');

    let userName = document.querySelector('.user__name').textContent;
    let jobName = document.querySelector('.user__job-name').textContent;

    itemName.value = userName;
    jobName.value = jobName;
}

function handleLikeButton(evt, target, loop) {
    evt.target.classList.toggle('card__heart-icon_black');
}

function handleDeleteButton(evt) {
    evt.target.parentNode.remove();
}

function handleImagePopup(evt) {
    const cardElement = imageTemplate.querySelector('.image__popup-container').cloneNode(true);
    cardElement.querySelector('.image__popup').src = evt.target.src;
    fPopupContainer.style.width = 'inherit';
    fPopupContainer.style.paddingTop = 0;
    fPopupContainer.style.paddingBottom = 0;
    fPopupContainer.append(cardElement);
    fPopup.classList.remove('popup_state-closed');
}

function handleUserForm(evt) {
    const cardTemplateElement = cardAddTemplate.querySelector('.form-user-new').cloneNode(true);
    fPopupContainer.append(cardTemplateElement);
    document.querySelector('.form__submit').addEventListener('click', handleCardAdd);
    fPopup.classList.remove('popup_state-closed');
}

function handleCardAdd(evt) {
    evt.preventDefault();

    const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);

    cardElement.querySelector('.card__caption').textContent = document.querySelector('.form__input_type_item-name').value;
    cardElement.querySelector('.card__image').src = document.querySelector('.form__input_type_item-job-name').value;

    cardElement.querySelector('.card__heart-icon').addEventListener('click', handleLikeButton);
    cardElement.querySelector('.card__button').addEventListener('click', handleDeleteButton);
    cardElement.querySelector('.card__image').addEventListener('click', handleImagePopup);

    cardList.insertBefore(cardElement, cardList.firstChild);
    fPopup.classList.add('popup_state-closed');
}

form.addEventListener('submit', handleFormSubmit);
closeIcon.addEventListener('click', handleFormClose);
editButton.addEventListener('click', handleFormOpen);
userAddButton.addEventListener('click', handleUserForm);

/*
likeButton.forEach(function(item) {
    item.addEventListener('click', handleLikeButton);
});

cardButton.forEach(function(item) {
    item.addEventListener('click', handleDeleteButton);
});
*/

document.addEventListener('DOMContentLoaded', function() {
    fPopupContainer.removeChild(form);
    initialCards.forEach(function(item) {
        const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);

        cardElement.querySelector('.card__caption').textContent = item.name;
        cardElement.querySelector('.card__image').src = item.link;
        console.log(item.name + ' ' + item.link);

        cardElement.querySelector('.card__heart-icon').addEventListener('click', handleLikeButton);
        cardElement.querySelector('.card__button').addEventListener('click', handleDeleteButton);
        cardElement.querySelector('.card__image').addEventListener('click', handleImagePopup);

        cardList.append(cardElement);
    });
})