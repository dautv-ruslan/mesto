export class Popup {
    constructor(selector) {
        this._popupElement = document.querySelector(selector);
    }
    open = () => {
        this._popupElement.classList.add('popup_state-opened');
    }
    close = () => {
        this._popupElement.classList.remove('popup_state-opened');
    }
    _handleEscClose = (evt) => {
        if (evt.code == 'Escape') {
            this.close();
        }
    }
    setEventListeners = () => {
        document.querySelectorAll('.popup').forEach((item) => {
            item.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains('popup_state-opened') || evt.target.classList.contains('popup__close-icon')) {
                    this.close();
                }
            });
        });
    }
}