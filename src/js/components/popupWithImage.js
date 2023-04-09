import {Popup} from './Popup.js';
import { imageTemplate, imageCaption, imageLink } from "../cards.js";
import { closeOnEscapeButtonClick } from '../functions.js';

export class PopupWithImage extends Popup {
    constructor(selector, name, link) {
        super(selector);
        this._name = name;
        this._link = link;
    }

    open = (name, link) => {
        this._element.classList.add('popup_state-opened');
        imageLink.src = this._link;
        imageLink.setAttribute('alt', this._name);
        imageCaption.innerText = this._name;
        document.addEventListener('keydown', closeOnEscapeButtonClick);
    }
}