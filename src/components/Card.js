export default class Card {
    constructor({name, link, likes=[], _id, owner}, handleCardClick , templateSelector, toggleLike, handleDelClick, myId){
      this._id = _id;
      this._toggleLike = toggleLike;
      this._templateSelector = templateSelector;
      this._link = link;
      this._name = name;
      this._handleOpenPopup = handleCardClick;
      this._handleDelClick = handleDelClick;
      this.likes = likes;
      this._ownerId = owner._id;
      this._isCardMine = this._ownerId === myId;
      this._isLiked = this.likes.some(function (like) {
        return like._id === myId
      })
    }
    _getTemplate(){
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
      return cardElement;
    }
    deleteCardFromPage(){
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
        this._toggleLike(this);
      })
      this._element.querySelector('.element__trash').addEventListener('click', () => {
        this._handleDelClick(this);
      })
    }
    generateCard() {
      this._element = this._getTemplate();
      this._popupImg = this._element.querySelector('.element__pic');
      this._qtyLikes = this._element.querySelector('.element__qty-like');
      this._popupImg.src = this._link;
      this._popupImg.alt = this._name;
      this._qtyLikes.textContent = this.likes.length;
      this._element.querySelector('.element__description').textContent = this._name;
      this._setEventListeners();
      this._updateLikes
      if(!this._isCardMine){
        this._element.querySelector('.element__trash').classList.add('element__trash_inactive')
      }
      return this._element;
    }
    newLikesData(data){
      this._qtyLikes.textContent = data.likes.length;
      this._isLiked = !this._isLiked;
      this._updateLikes();
    }
    getCardInfo(){
      return this._isLiked;
    }
    _updateLikes(){
      if(this._isLiked){
        this._element.querySelector('.element__like').classList.add('element__like_active')
      }else{
        this._element.querySelector('.element__like').classList.remove('element__like_active')
      }
    }

}