import { imageTemplate, imageCaption, imageLink } from "../cards.js";

export class Card {
    constructor(data, template, handleCardClick) {
        this.name = data.name;
        this.link = data.link;
        this._template = template;
        this._handleCardClick = handleCardClick;

        this.templateElement = document.querySelector(this._template).content;
        this.cardElement = this.templateElement.querySelector('.card__item').cloneNode(true);

        this.cardElementCaption = this.cardElement.querySelector('.card__caption');
        this.cardElementImage = this.cardElement.querySelector('.card__image');

        this.heartButton = this.cardElement.querySelector('.card__heart-icon');
    }

    _switch = (evt, target, loop) => {
        this.heartButton.classList.toggle('card__heart-icon_black');
    }

    _deleteCard = () => {
        this.cardElement.remove();
        this.cardElement = null;
    }

    _setCardTemplate = () => {
        this.cardElementCaption.textContent = this.name;
        this.cardElementImage.src = this.link;
        this.cardElementImage.setAttribute('alt', this.name);
    }
    _setEventListeners = () => {
        this.heartButton.addEventListener('click', this._switch);

        this.cardElement.querySelector('.card__button').addEventListener('click', this._deleteCard);
        this.cardElementImage.addEventListener('click', () => {
            this._handleCardClick(this.name, this.link)
        });
    }

    addCard = () => {
        this._setCardTemplate();
        this._setEventListeners();
        return this.cardElement;
    }
}