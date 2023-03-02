import { initialCards } from "./constants.js";
import { closePopup, closeByEsc, popupAddCard } from "./index.js";

const popupPhotoPreview = document.querySelector('.popup_type_preview');
const elementsContainer = document.querySelector('.elements');
const cardPlace = document.querySelector('.popup__item_el_place');
const cardSrc = document.querySelector('.popup__item_el_src');
const previewName = document.querySelector('.popup__preview-name');
const previewImg = document.querySelector('.popup__img');

class Card {
    constructor(templateSelector){
      this._templateSelector = templateSelector;
    }
    _getTemplate(){
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
      return cardElement;
    }
    _handleOpenPopup(){
      previewImg.src = this._link;
      previewImg.alt = this._name;
      popupPhotoPreview.classList.add('popup_opened');
      document.addEventListener('keydown', closeByEsc);
    }
    _handleClosePopup(){
      previewImg.src = '';
      previewImg.alt = '';
      popupPhotoPreview.classList.remove('popup_opened');
      document.removeEventListener('keydown', closeByEsc)
    }
    _setEventListeners(){
      this._element.querySelector('.element__pic').addEventListener('click', () => {
        this._handleOpenPopup();
      })
      popupPhotoPreview.querySelector('.popup__close-icon').addEventListener('click', () => {
        this._handleClosePopup();
      })
      this._element.querySelector('.element__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like_active');
      })
      this._element.querySelector('.element__trash').addEventListener('click', () => {
        this._element.remove();
        this._element = null;
      })
    }  
}
  class DefaultCard extends Card {
    constructor(data, templateSelector){
      super(templateSelector);
      this._link = data.link;
      this._name = data.name;
    }
    _handleOpenPopup(){
      previewName.textContent = this._name;
      super._handleOpenPopup();
    }
    _handleClosePopup(){
      previewName.textContent = '';
      super._handleClosePopup();
    }
    generateCard() {
      this._element = super._getTemplate();
      super._setEventListeners();
      this._element.querySelector('.element__pic').src = this._link;
      this._element.querySelector('.element__pic').alt = this._name;
      this._element.querySelector('.element__description').textContent = this._name;
      return this._element;
    }
  }
  function renderElements(photoElement){
    elementsContainer.prepend(photoElement);
  }
  function addCard(evt){
    evt.preventDefault();
    const inputobj = {
      name: cardPlace.value,
      link: cardSrc.value
    };
    const photo = new DefaultCard(inputobj, '.template');
    const photoElement = photo.generateCard();
    return photoElement
  };
  popupAddCard.addEventListener('submit', (evt) => {
    renderElements(addCard(evt));
    closePopup(popupAddCard);
    evt.target.reset();
    evt.submitter.classList.add('popup__button_inactive')
    evt.submitter.disabled = true;
  });
  initialCards.forEach((item) => {
    const card = new DefaultCard(item, '.template');
    const cardElement = card.generateCard();
    renderElements(cardElement)
  })