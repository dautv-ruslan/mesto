import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selector, callBackSubmit) {
        super(selector);
        this._callBackSubmit = callBackSubmit;
        this._form = this._popupElement.querySelector('form');
        this._inputList = this._popupElement.querySelectorAll('input');
    }

    _getInputValues = () => {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners = () => {
        document.querySelectorAll('.popup').forEach((item) => {
            item.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains('popup_state-opened') || evt.target.classList.contains('popup__close-icon')) {
                    this.close();
                }
            });
        });
        this._popupElement.addEventListener('submit', this._callBackSubmit);
    }

    close = () => {
        // super.close(); Этот метод не работает, не могу определить причину
        this._popupElement.classList.remove('popup_state-opened');
        this._form.reset();
    }
}