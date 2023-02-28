/* Используемые ноды */

const form = document.querySelector(".form-user-new");
const formUser = document.querySelector('.card-add-form');

const fPopup = document.querySelector('.popup');
const fPopupContainer = document.querySelector('.popup__container');
const closeIcon = document.querySelector('.popup__close-icon');
const overlay = document.querySelectorAll('.popup');
const imageCloseIcon = document.querySelector('.popup__image-close-icon');
const cardCloseIcon = document.querySelector('.popup__card-close-icon');
const editButton = document.querySelector('.user__edit-button');
const likeButton = document.querySelectorAll('.card__heart-icon');
const cardButton = document.querySelectorAll('.card__button');
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

/*
const cardTemplateName = cardAddTemplate.querySelector('.form-user-new__input_type_card-name');
const cardTemplateLink = cardAddTemplate.querySelector('.form-user-new__input_type_card-link');
*/

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

    /* Слушатель событий имеет четко определенные параметры в функции, это event, target, loop. Если установить другие параметры, конструкция перестает работать */
    cardElement.querySelector('.card__button').addEventListener('click', function() {
        cardElement.remove();
    });
    
    /* Слушатель событий имеет четко определенные параметры в функции, это event, target, loop. Если установить другие параметры, конструкция перестает работать */
    cardElementImage.addEventListener('click', function() {
        imageLink.src = link;
        imageLink.setAttribute('alt', name);
        imageCaption.innerText = name;
        openPopup(imageTemplate);
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

function handleFormSubmit(evt) {
    evt.preventDefault();
    
    userName.textContent = itemName.value;
    userJobName.textContent = jobName.value;

    closePopup(fPopup);
}

function handleFormClose(evt) {
    closePopup(fPopup);
}

function handleImageClose(evt) {
    closePopup(imageTemplate);
}

function handleCardClose(evt) {
    closePopup(cardAddTemplate);
}

function handleFormOpen(evt) {
    openPopup(fPopup);

    const userNameContent = userName.textContent;
    const jobNameContent = userJobName.textContent;

    itemName.value = userNameContent;
    jobName.value = jobNameContent;
}

function handleLikeButton(evt, target, loop) {
    evt.target.classList.toggle('card__heart-icon_black');
}

/*
function handleDeleteButton(evt) {
    evt.target.parentNode.remove();
}

function handleImagePopup(name, link) {
    imageTemplate.querySelector('.popup__image').src = link;
    imageTemplate.querySelector('.popup__image-hint').innerText = name;

    openPopup(imageTemplate);
}
*/

function handleUserForm(evt) {
    /*
    const cardTemplateElement = cardAddTemplate.querySelector('.form-user-new').cloneNode(true);
    fPopupContainer.append(cardTemplateElement);
    document.querySelector('.form__submit').addEventListener('click', handleCardAdd);
    */
    cardName.value = '';
    cardLink.value = '';
    openPopup(cardAddTemplate);
}

function handleCardAdd(evt) {
    evt.preventDefault();

    const cardItem = insertCard(cardName.value, cardLink.value);

    cardList.insertBefore(cardItem, cardList.firstChild);
    closePopup(cardAddTemplate);
}

const formInput = form.querySelector('.popup__input');

/* Привязка слотов и сигналов, подписчиков */

form.addEventListener('submit', handleFormSubmit);
setEventListeners(form);
setEventListeners(formUser);
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

/* Инициализация карточек */

document.addEventListener('DOMContentLoaded', function() {
    initialCards.forEach(function(item) {
        const cardItem = insertCard(item.name, item.link);

        cardList.append(cardItem);
    });
    overlay.forEach(function(item) {
        item.addEventListener('click', function(evt) {
            if (evt.target == fPopup) {
                closePopup(fPopup)
            }
            if (evt.target == cardAddTemplate) {
                closePopup(cardAddTemplate);
            }
        })
    });
    document.addEventListener('keydown', function(evt) {
        if (evt.code == 'Escape') {
            closePopup(fPopup);
            closePopup(cardAddTemplate);
        }
    });
})