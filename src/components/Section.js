export default class Section {
    constructor({item, renderer}, selector){
        this._item = item;
        this._container = selector;
        this._renderer = renderer
    }
    addItem(element){
        this._container.prepend(element);
    }
    renderItems(){
        this._renderer(this._item);
    }
}