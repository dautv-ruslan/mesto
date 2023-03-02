/* Используемые ноды */

const profileForm = document.forms['form-user-profile'];
const formUser = document.forms['form-user-new'];

const profilePopup = document.querySelector('.profile-popup');
const fPopupContainer = document.querySelector('.popup__container');

const overlays = document.querySelectorAll('.popup');
const editButton = document.querySelector('.user__edit-button');
const userAddButton = document.querySelector('.user__add-button');
const cardAddSubmit = document.querySelector('.popup__submit_type_add');

const itemName = document.querySelector('.popup__input_type_item-name');
const jobName = document.querySelector('.popup__input_type_item-job-name');
const cardTemplate = document.querySelector('#card-template').content;
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

function insertCard(name, link) {
    const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);

    const cardElementCaption = cardElement.querySelector('.card__caption');
    const cardElementImage = cardElement.querySelector('.card__image');

    cardElementCaption.textContent = name;
    cardElementImage.src = link;
    cardElementImage.setAttribute('alt', name);

    cardElement.querySelector('.card__heart-icon').addEventListener('click', handleLikeButton);

    cardElement.querySelector('.card__button').addEventListener('click', function() {
        cardElement.remove();
    });
    
    cardElementImage.addEventListener('click', function() {
        imageLink.src = link;
        imageLink.setAttribute('alt', name);
        imageCaption.innerText = name;
        openPopup(imageTemplate);
        document.addEventListener('keydown', closeOnEscapeButtonClick);
    });

    return cardElement;
}

function openPopup(item) {
    item.classList.add('popup_state-opened');
}

function closePopup(item) {
    item.classList.remove('popup_state-opened');
}

/* Обработчики событий */

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    
    userName.textContent = itemName.value;
    userJobName.textContent = jobName.value;

    closePopup(profilePopup);
}

function openProfileForm(evt) {
    openPopup(profilePopup);
    document.addEventListener('keydown', closeOnEscapeButtonClick);

    const userNameContent = userName.textContent;
    const jobNameContent = userJobName.textContent;

    itemName.value = userNameContent;
    jobName.value = jobNameContent;
}

function handleLikeButton(evt, target, loop) {
    evt.target.classList.toggle('card__heart-icon_black');
}

function openCardForm(evt) {
    openPopup(cardAddTemplate);
    document.addEventListener('keydown', closeOnEscapeButtonClick);
}

function handleCardAdd(evt) {
    evt.preventDefault();

    const submitButtonElement = formUser.querySelector('input[type="submit"]');

    const cardItem = insertCard(cardName.value, cardLink.value);

    cardList.insertBefore(cardItem, cardList.firstChild);

    evt.target.reset();

    hideSubmitButton(submitButtonElement, 'popup__submit_state_enabled');
    
    closePopup(cardAddTemplate);
}

function closeOnEscapeButtonClick(evt) {
    if (evt.code == 'Escape') {
        const openedPopup = document.querySelector('.popup_state-opened');
        closePopup(openedPopup);
        document.removeEventListener('keydown', closeOnEscapeButtonClick);
    }
}

const formInput = profileForm.querySelector('.popup__input');

/* Привязка слотов и сигналов, подписчиков */

profileForm.addEventListener('submit', handleProfileFormSubmit);
enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_state_disabled",
    activeButtonClass: "popup__submit_state_enabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active"
});
editButton.addEventListener('click', openProfileForm);
userAddButton.addEventListener('click', openCardForm);
formUser.addEventListener('submit', handleCardAdd);

/* Инициализация карточек */

document.addEventListener('DOMContentLoaded', function() {
    initialCards.forEach(function(item) {
        const cardItem = insertCard(item.name, item.link);

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
    document.addEventListener('keydown', closeOnEscapeButtonClick);
})