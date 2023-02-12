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

const form = document.querySelector(".form");
const fPopup = document.querySelector('.popup');
const fPopupContainer = document.querySelector('.popup__container');
const closeIcon = document.querySelector('.popup__close-icon');
const imageCloseIcon = document.querySelector('.popup__image-close-icon');
const cardCloseIcon = document.querySelector('.popup__card-close-icon');
const editButton = document.querySelector('.user__edit-button');
const likeButton = document.querySelectorAll('.card__heart-icon');
const cardButton = document.querySelectorAll('.card__button');
const userAddButton = document.querySelector('.user__add-button');
const cardAddSubmit = document.querySelector('.form__card-add-submit');

const itemName = document.querySelector('.form__input_type_item-name');
const jobName = document.querySelector('.form__input_type_item-job-name');
const cardTemplate = document.querySelector('#card-template').content;
const cardAddTemplate = document.querySelector('.card-add-template');
const imageTemplate = document.querySelector('.image-template');
const cardList = document.querySelector('.card__list');

function handleFormSubmit(evt) {
    evt.preventDefault();

    document.querySelector('.user__name').textContent = itemName.value;
    document.querySelector('.user__job-name').textContent = jobName.value;

    fPopup.classList.add('popup_state-closed');
}

function handleFormClose(evt) {
    fPopup.classList.add('popup_state-closed');
}

function handleImageClose(evt) {
    imageTemplate.classList.add('popup_state-closed');
}

function handleCardClose(evt) {
    cardAddTemplate.classList.add('popup_state-closed');
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
    imageTemplate.querySelector('.popup__image').src = evt.target.src;
    imageTemplate.querySelector('.popup__image-hint').innerText = evt.target.parentNode.querySelector('.card__caption').innerText;

    imageTemplate.classList.remove('popup_state-closed');
}

function handleUserForm(evt) {
    /*
    const cardTemplateElement = cardAddTemplate.querySelector('.form-user-new').cloneNode(true);
    fPopupContainer.append(cardTemplateElement);
    document.querySelector('.form__submit').addEventListener('click', handleCardAdd);
    */
    cardAddTemplate.querySelector('.form__input_type_card-name').value = '';
    cardAddTemplate.querySelector('.form__input_type_card-link').value = '';
    cardAddTemplate.classList.remove('popup_state-closed');
}

function insertCard(name, link) {
    const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);

    cardElement.querySelector('.card__caption').textContent = name;
    cardElement.querySelector('.card__image').src = link;

    cardElement.querySelector('.card__heart-icon').addEventListener('click', handleLikeButton);
    cardElement.querySelector('.card__button').addEventListener('click', handleDeleteButton);
    cardElement.querySelector('.card__image').addEventListener('click', handleImagePopup);

    return cardElement;
}

function handleCardAdd(evt) {
    evt.preventDefault();

    const cardItem = insertCard(document.querySelector('.form__input_type_card-name').value, document.querySelector('.form__input_type_card-link').value);

    cardList.insertBefore(cardItem, cardList.firstChild);
    cardAddTemplate.classList.add('popup_state-closed');
}

form.addEventListener('submit', handleFormSubmit);
closeIcon.addEventListener('click', handleFormClose);
imageCloseIcon.addEventListener('click', handleImageClose);
cardCloseIcon.addEventListener('click', handleCardClose);
editButton.addEventListener('click', handleFormOpen);
userAddButton.addEventListener('click', handleUserForm);
cardAddSubmit.addEventListener('click', handleCardAdd);

/*
likeButton.forEach(function(item) {
    item.addEventListener('click', handleLikeButton);
});

cardButton.forEach(function(item) {
    item.addEventListener('click', handleDeleteButton);
});
*/

document.addEventListener('DOMContentLoaded', function() {
    initialCards.forEach(function(item) {
        const cardItem = insertCard(item.name, item.link);

        cardList.append(cardItem);
    });
})