export default class Card {
    constructor({data, handleCardClick }, templateSelector){
      this._templateSelector = templateSelector;
      this._link = data.link;
      this._name = data.name;
      this._handleOpenPopup = handleCardClick;
    }
    _getTemplate(){
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
      return cardElement;
    }
    _toggleLike(evt){
      evt.target.classList.toggle('element__like_active');
    }
    _deleteCard(){
      this._element.remove();
      this._element = null;
    }
    __handleImageClick(){
      this._handleOpenPopup(this._link, this._name);
    }
    _setEventListeners(){
      this._popupImg.addEventListener('click', () => {
        this.__handleImageClick();
      })
      this._element.querySelector('.element__like').addEventListener('click', () => {
        this._toggleLike();
      })
      this._element.querySelector('.element__trash').addEventListener('click', () => {
        this._deleteCard();
      })
    }
    generateCard() {
      this._element = this._getTemplate();
      this._popupImg = this._element.querySelector('.element__pic');
      this._popupImg.src = this._link;
      this._popupImg.alt = this._name;
      this._element.querySelector('.element__description').textContent = this._name;
      this._setEventListeners();
      return this._element;
    }
}