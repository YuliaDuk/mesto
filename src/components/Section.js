export default class Section {
    constructor({items, renderer}, selector){
        this._items = items;
        this._container = selector;
        this._renderer = renderer
    }
    addItem(element){
        this._container.prepend(element);
    }
    renderItems(){
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
}