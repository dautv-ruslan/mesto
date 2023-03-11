export function openPopup(item) {
    item.classList.add('popup_state-opened');
    document.addEventListener('keydown', closeOnEscapeButtonClick);
}

export function closePopup(item) {
    item.classList.remove('popup_state-opened');
    document.removeEventListener('keydown', closeOnEscapeButtonClick);
}

export default function closeOnEscapeButtonClick(evt) {
    if (evt.code == 'Escape') {
        const openedPopup = document.querySelector('.popup_state-opened');
        closePopup(openedPopup);
    }
}