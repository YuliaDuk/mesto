import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./constants.js";
const options = {formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};
const popupPhotoPreview = document.querySelector('.popup_type_preview');
const elementsContainer = document.querySelector('.elements');
const cardPlace = document.querySelector('.popup__item_el_place');
const cardSrc = document.querySelector('.popup__item_el_src');
const previewName = document.querySelector('.popup__preview-name');
const previewImg = document.querySelector('.popup__img');
//переменные для попапов
const popupEdit = document.querySelector('.popup_type_red');
const popupAddCard = document.querySelector('.popup_type_add');
const popups = document.querySelectorAll('.popup');
//переменные для кнопок
const popupEditOpenButton = document.querySelector('.profile__button');
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-icon');
//переменные для инпутов
const nameInput = document.querySelector('.popup__item_el_name');
const jobInput = document.querySelector('.popup__item_el_job');
//переменные для блока profile
const changeName = document.querySelector('.profile__name');
const changeJob = document.querySelector('.profile__description');
//переменные для форм
const formEdit = document.querySelector('.popup__form_type_red');
const formAdd = document.querySelector('.popup__form_type_add');
//открытие и закрытие попапа
const openPopup = (popup)  => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}
//открытие формы редактирования профиля
function openPopupForm(){
  nameInput.value = changeName.textContent;
  jobInput.value = changeJob.textContent;
  openPopup(popupEdit);
}
popupEditOpenButton.addEventListener('click', openPopupForm);

//редактирование формы профиля
function handleFormEdit (evt) {
    evt.preventDefault();      
    changeName.textContent = nameInput.value;
    changeJob.textContent = jobInput.value;
    closePopup(popupEdit);
}
formEdit.addEventListener('submit', handleFormEdit); 

//открытие формы добавления карточек
function openAddForm(){
    openPopup(popupAddCard);
}
popupAddCardOpenButton.addEventListener('click', openAddForm);
//открытие формы превью
function handleOpenPopup (link, name) {
  previewName.textContent = name;
  previewImg.src = link;
  previewImg.alt = name;
  openPopup(popupPhotoPreview);
}
//закрытие всех форм
closeButtons.forEach(item => {
  const closestPopup = item.closest('.popup');
  item.addEventListener('click', () => closePopup(closestPopup));
});
// закрытие по Esc
const closeByEsc = (evt) => {
  if (evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};
//закрытие формы по клику на фоне
function closePreviewFormByOverlay (evt){
  if (evt.target === evt.currentTarget){ 
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};
popups.forEach((popup) =>{
  popup.addEventListener('click', closePreviewFormByOverlay)
});
//валидация
function validationFunction (formName) {
  const checkResult = new FormValidator(options, formName).enableValidation();
  return checkResult;
}
validationFunction(formEdit);
validationFunction(formAdd);
//отрисовка карточек
function renderElements(object){
  const photo = new Card(object, '.template', handleOpenPopup);
  const photoElement = photo.generateCard();
  elementsContainer.prepend(photoElement);
}
//добавление через форму
function addCard(evt){
  evt.preventDefault();
  const inputobj = {
    name: cardPlace.value,
    link: cardSrc.value
  };
  return inputobj
};
popupAddCard.addEventListener('submit', (evt) => {
  renderElements(addCard(evt));
  closePopup(popupAddCard);
  evt.target.reset();
  new FormValidator(options, popupAddCard).disableButtonState();
});
//добавление первых 6 карточек
initialCards.forEach((item) => {
  renderElements(item)
})
