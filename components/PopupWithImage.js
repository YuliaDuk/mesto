import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor({name, link}, selector){
        super(selector);
        this._name = name;
        this._link = link;
        this._selector = selector;
        this._popup = document.querySelector(selector);
        this._popupImage = this._popup.querySelector('.popup__img');
        this._popupName = this._popup.querySelector('.popup__preview-name');
    }
    open(){
        super.open();
        this._popupImage.src = this._link;
        this._popupImage.alt = this._name;
        this._popupName.textContent = this._name;
    }
}