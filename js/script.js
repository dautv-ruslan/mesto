let form = document.querySelector(".form");
let f_popup = document.querySelector('.popup');
let f_popup_container = document.querySelector('.popup__container');
let close_icon = document.querySelector('.form__close-icon');
let add_button = document.querySelector('.user__name');

function handleFormSubmit(evt) {
    evt.preventDefault();

    let item_name = document.querySelector('.form__item-name');
    let job_name = document.querySelector('.form__item-job-name');

    document.querySelector('.user__name').innerHTML = item_name.value;
    document.querySelector('.user__job-name').innerText = job_name.value;

    form.classList.remove('popup-opened');
    form.classList.add('popup-closed');
    f_popup.classList.add('popup-closed');
    f_popup_container.classList.add('popup-closed');
}

function handleFormClose(evt) {
    form.classList.remove('popup-opened');
    form.classList.add('popup-closed');
    f_popup.classList.add('popup-closed');
    f_popup_container.classList.add('popup-closed');
}

function handleFormOpen(evt) {
    if (evt.offsetX > 300) {
        form.classList.add('popup-opened');
        form.classList.remove('popup-closed');
        f_popup.classList.remove('popup-closed');
        f_popup_container.classList.remove('popup-closed');
    }
}

form.addEventListener('submit', handleFormSubmit);
close_icon.addEventListener('click', handleFormClose);
add_button.addEventListener('click', handleFormOpen);