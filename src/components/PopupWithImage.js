import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(selector){
        super(selector);
        this._selector = selector;
        this._popupImage = this._popup.querySelector('.popup__img');
        this._popupName = this._popup.querySelector('.popup__preview-name');
    }
    open({name, link}){
        super.open();
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupName.textContent = name;
    }
}