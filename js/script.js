let form = document.querySelector(".form");
let f_popup = document.querySelector('.popup');
let f_popup_container = document.querySelector('.popup__container');
let close_icon = document.querySelector('.form__close-icon');
let edit_button = document.querySelector('.user__edit-button');

function handleFormSubmit(evt) {
    evt.preventDefault();

    let item_name = document.querySelector('.form__item-name');
    let job_name = document.querySelector('.form__item-job-name');

    document.querySelector('.user__name').innerHTML = item_name.value;
    document.querySelector('.user__job-name').innerText = job_name.value;

    form.classList.add('popup-closed');
    f_popup.classList.add('popup-closed');
    f_popup_container.classList.add('popup-closed');
}

function handleFormClose(evt) {
    form.classList.add('popup-closed');
    f_popup.classList.add('popup-closed');
    f_popup_container.classList.add('popup-closed');
}

function handleFormOpen(evt) {
    form.classList.remove('popup-closed');
        f_popup.classList.remove('popup-closed');
        f_popup_container.classList.remove('popup-closed');

        let user_name = document.querySelector('.user__name').innerHTML;
        let job_name = document.querySelector('.user__job-name').innerHTML;

        document.querySelector('.form__item-name').value(user_name);
        document.querySelector('.form__item-job-name').value(job_name);
}

form.addEventListener('submit', handleFormSubmit);
close_icon.addEventListener('click', handleFormClose);
edit_button.addEventListener('click', handleFormOpen);