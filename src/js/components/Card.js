export class Card {
    constructor(data, template, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._template = template;
        this._handleCardClick = handleCardClick;

        this._templateElement = document.querySelector(this._template).content;
        this._cardElement = this._templateElement.querySelector('.card__item').cloneNode(true);

        this._cardElementCaption = this._cardElement.querySelector('.card__caption');
        this._cardElementImage = this._cardElement.querySelector('.card__image');

        this._heartButton = this._cardElement.querySelector('.card__heart-icon');
    }

    _switch = (evt, target, loop) => {
        this._heartButton.classList.toggle('card__heart-icon_black');
    }

    _deleteCard = () => {
        this._cardElement.remove();
        this._cardElementCaption = null;
        this._cardElementImage = null;
        this._heartButton = null;
        this._cardElement = null;
    }

    _setCardTemplate = () => {
        this._cardElementCaption.textContent = this._name;
        this._cardElementImage.src = this._link;
        this._cardElementImage.setAttribute('alt', this._name);
    }
    _setEventListeners = (name, link, handleCardClick) => {
        this._heartButton.addEventListener('click', this._switch);

        this._cardElement.querySelector('.card__button').addEventListener('click', this._deleteCard);
        this._cardElementImage.addEventListener('click', () => {
            handleCardClick(name, link);
        })
    }

    generateCard = () => {
        this._setCardTemplate();
        this._setEventListeners(this._name, this._link, this._handleCardClick);
        return this._cardElement;
    }
}