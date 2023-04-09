export const closePopup = (item) => {
    item.classList.remove('popup_state-opened');
    document.removeEventListener('keydown', closeOnEscapeButtonClick);
}

export const closeOnEscapeButtonClick = (evt) => {
    if (evt.code == 'Escape') {
        const openedPopup = document.querySelector('.popup_state-opened');
        closePopup(openedPopup);
    }
}

export const openPopup = (item) => {
    item.classList.add('popup_state-opened');
    document.addEventListener('keydown', closeOnEscapeButtonClick);
}