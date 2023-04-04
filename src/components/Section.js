export default class Section {
    constructor(renderer, selector){
        this._container = selector;
        this._renderer = renderer
    }
    addItem(element){
        this._container.prepend(element);
    }
    renderItems(items, myId){
        items.forEach((item) => {
            this._container.append(this._renderer(item, myId));
        });
    }
}