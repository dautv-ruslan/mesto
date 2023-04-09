import { Popup } from './Popup.js';
import { closePopup } from '../functions.js';
import { userName, userJobName, itemName, jobName, profilePopup, cardName, cardLink, cardsContainer } from '../cards.js';
import {Card} from './Card.js';

export class PopupWithForm extends Popup {
    constructor(selector, callBackSubmit) {
        super(selector);
        this._callBackSubmit = callBackSubmit;
        this._form = this._element.querySelector('form');
    }

    _getInputValues = () => {

    }

    setEventListeners = (callBack) => {
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
        this._element.addEventListener('submit', callBack);
    }

    close = () => {
        this._element.classList.remove('popup_state-opened');
        this._element.reset();
    }
}