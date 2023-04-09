export class Popup {
    constructor(selector) {
        this._selector = selector;
        this._element = document.querySelector(this._selector);
    }
    open = () => {
        this._element.classList.add('popup_state-opened');
    }
    close = () => {
        this._element.classList.remove('popup_state-opened');
    }
    _handleEscClose = (evt) => {
        if (evt.code == 'Escape') {
            const openedPopup = document.querySelector('.popup_state-opened');
            this.close(openedPopup);
        }
    }
    setEventListeners = () => {
        document.querySelectorAll('.popup').forEach((item) => {
            item.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains('popup_state-opened')) {
                    this.close(item);
                }
                if (evt.target.classList.contains('popup__close-icon')) {
                    this.close(item);
                }
            })
        })
    }
}