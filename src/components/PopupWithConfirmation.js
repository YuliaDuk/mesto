import Popup from "./Popup.js"
export default class PopupWithConfirmation extends Popup {
    constructor(selector){
        super(selector)
        this._form = document.querySelector(selector).querySelector('.popup__form');
    }
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (evt)=>{
            evt.preventDefault(); 
            this._handleSubmit();
            this.close()
        })
    }
    deleteCardWithSubmit(handleSubmit){
       this._handleSubmit = handleSubmit
    }
}