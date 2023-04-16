import {Popup} from './Popup.js';
import { closeOnEscapeButtonClick } from '../functions.js';
import { imageTemplate, imageLink, imageCaption } from '../cards.js';

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._link = this._popupElement.querySelector('.popup__image-hint');
        this._name = this._popupElement.querySelector('.popup__image');
    }

    open = (name, link) => {
        super.open();
        this._link.src = link;
        this._link.setAttribute('alt', name);
        this._name.innerText = name;
        document.addEventListener('keydown', closeOnEscapeButtonClick);
    }
}