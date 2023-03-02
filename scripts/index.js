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
//переменные для элементов блока popup
const formEdit = document.querySelector('.popup__form_type_red');
//открытие и закрытие попапа
function openPopup(popup) {
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

export { closePopup, closeByEsc, popupAddCard }