import closeOnEscapeButtonClick from './functions.js';

export class Card {
    constructor(name, link, template) {
        this.name = name;
        this.link = link;
        this._template = template;

        this.imageTemplate = document.querySelector('.image-template');

        this.templateElement = document.querySelector(this._template).content;
        this.cardElement = this.templateElement.querySelector('.card__item').cloneNode(true);

        this.cardElementCaption = this.cardElement.querySelector('.card__caption');
        this.cardElementImage = this.cardElement.querySelector('.card__image');
    }

    _setCardTemplate() {
        this.cardElementCaption.textContent = this.name;
        this.cardElementImage.src = this.link;
        this.cardElementImage.setAttribute('alt', this.name);
    }
    _setEventListeners() {
        this.cardElement.querySelector('.card__heart-icon').addEventListener('click', function(evt, target, loop) {
            evt.target.classList.toggle('card__heart-icon_black');
        });

        this.cardElement.querySelector('.card__button').addEventListener('click', function(evt, target, loop) {
            evt.target.parentNode.remove();
        });
        this.cardElementImage.addEventListener('click', function(evt, target, loop) {
            const imageTemplate = document.querySelector('.image-template');
            const imageCaption = imageTemplate.querySelector('.popup__image-hint');
            const imageLink = imageTemplate.querySelector('.popup__image');
            const imageAltName = evt.target.getAttribute('alt')
            imageLink.src = evt.target.src;
            imageLink.setAttribute('alt', imageAltName);
            imageCaption.innerText = imageAltName;
            imageTemplate.classList.add('popup_state-opened');
            document.addEventListener('keydown', closeOnEscapeButtonClick);
        });
    }

    addCard() {
        this._setCardTemplate();
        this._setEventListeners();
        return this.cardElement;
    }
}