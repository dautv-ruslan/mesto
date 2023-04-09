import {Card} from './Card.js';
import { imageTemplate, imageCaption, imageLink } from '../cards.js';

export class Section {
    constructor({items, renderer}, element) {
        this.items = items;
        this.renderer = renderer;
        this.element = element;
    }

    renderElements() {
        this.items.forEach((item) => {
            const card = this.renderer(item);
            this.addItem(card);
        });
    }

    addItem = (item) => {
        this.element.append(item);
    }
}