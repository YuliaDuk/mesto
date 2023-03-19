export default class Popup {
    constructor(selector){
        this._popup = document.querySelector(selector);
        this._closeIcon = this._popup.querySelector('.popup__close-icon');
    }
    _handleEscClose(evt){
        if (evt.key === 'Escape'){
            this.close()
        }
    }
    setEventListeners(){
        this._closeIcon.addEventListener('click', this.close.bind(this));
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.addEventListener('click',(evt) =>{
            if (evt.target === evt.currentTarget){ 
                this.close();
            }
        });
    }
    close(){
        this._popup.classList.remove('popup_opened')
    }
    open(){
        this._popup.classList.add('popup_opened');
    }
}