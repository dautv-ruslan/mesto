let form = document.querySelector(".form");
let fPopup = document.querySelector('.popup');
let closeIcon = document.querySelector('.popup__close-icon');
let editButton = document.querySelector('.user__edit-button');

let itemName = document.querySelector('.form__input_item-name');
let jobName = document.querySelector('.form__input_item-job-name');

function handleFormSubmit(evt) {
    evt.preventDefault();

    document.querySelector('.user__name').textContent = itemName.value;
    document.querySelector('.user__job-name').textContent = jobName.value;

    fPopup.classList.add('popup_state-closed');
    fPopup.style.display = "none";
}

function handleFormClose(evt) {
    fPopup.classList.add('popup_state-closed');
    fPopup.style.display = "none";
}

function handleFormOpen(evt) {
    fPopup.classList.remove('popup_state-closed');
    fPopup.style.display = "flex";

    let userName = document.querySelector('.user__name').textContent;
    let jobName = document.querySelector('.user__job-name').textContent;

    itemName.value = userName;
    jobName.value = jobName;
}

form.addEventListener('submit', handleFormSubmit);
closeIcon.addEventListener('click', handleFormClose);
editButton.addEventListener('click', handleFormOpen);