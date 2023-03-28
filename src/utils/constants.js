const arkhys = new URL('../images/arkhyz.jpg', import.meta.url);
const chelyabinskRegion = new URL('../images/chelyabinsk-oblast.jpg', import.meta.url);
const ivanov = new URL('../images/ivanovo.jpg', import.meta.url);
const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url);
const holmogorsk = new URL('../images/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL('../images/baikal.jpg', import.meta.url);

export const initialCards = [
    { name: 'Архыз', link: ''},
    { name: 'Челябинская область', link: chelyabinskRegion },
    { name: 'Иваново', link: ivanov },
    { name: 'Камчатка', link: kamchatka },
    { name: 'Холмогорский район', link: holmogorsk },
    { name: 'Байкал', link: baikal }
  ]; 
export const options = {formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};
export const elementsContainer = document.querySelector('.elements');
export const popupEditOpenButton = document.querySelector('.profile__button');
export const popupAddCardOpenButton = document.querySelector('.profile__add-button');
export const nameInput = document.querySelector('.popup__item_el_name');
export const jobInput = document.querySelector('.popup__item_el_job');
export const formEdit = document.querySelector('.popup__form_type_red');
export const formAdd = document.querySelector('.popup__form_type_add');
export const formImg = document.querySelector('.popup__form_type_imgred')
export const objectProfileEdit = {
  firstname: '.profile__name',
  job: '.profile__description'
}
export const imgEdit = document.querySelector('.profile__img-button')
