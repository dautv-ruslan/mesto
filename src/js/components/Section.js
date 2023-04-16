export class Section {
    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._element = document.querySelector(selector);
    }

    renderElements() {
        this._items.forEach((item) => {
            const card = this._renderer(item);
            this.addItem(card);
        });
    }

    addItem = (item) => {
        this._element.append(item);
    }
}