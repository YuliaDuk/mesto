import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
    constructor({selector, handleFormEdit}){
        super(selector);
        // this._selector = selector;
        this._form = document.querySelector(selector).querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__item');
        this._handleFormEdit = handleFormEdit;
    }
    _getInputValues(){
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    setEventListeners(){
        super.setEventListeners();
        
        this._form.addEventListener('submit', (evt)=>{
            evt.preventDefault(); 
            this._handleFormEdit(this._getInputValues());
            this.close();
        })
    }
    close(){
        super.close();
        this._form.reset();
    }
}
