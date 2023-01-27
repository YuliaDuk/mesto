//переменные для попапов
const popupEdit = document.querySelector('.popup_type_red');
const popupAddCard = document.querySelector('.popup_type_add');
const popupPhotoPreview = document.querySelector('.popup_type_preview');
//переменные для кнопок
const popupEditOpenButton = document.querySelector('.profile__button');
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-icon');
//переменные для инпутов
const nameInput = document.querySelector('.popup__item_el_name');
const jobInput = document.querySelector('.popup__item_el_job');
const cardPlace = document.querySelector('.popup__item_el_place');
const cardSrc = document.querySelector('.popup__item_el_src');
//переменные для блока profile
const changeName = document.querySelector('.profile__name');
const changeJob = document.querySelector('.profile__description');
//переменные для элементов блока popup
const formEdit = document.querySelector('.popup__form_type_red');
const formAddCard = document.querySelector('.popup__form_type_add');
const previewName = document.querySelector('.popup__preview-name');
const previewImg = document.querySelector('.popup__img');
//перемнная для elements - всей грид-таблицы
const elementsContainer = document.querySelector('.elements');
//переменные для template
const photoTemplate = document.querySelector('.template').content;
const card = photoTemplate.querySelector('.element'); //перменная используется в функции createElement
//открытие и закрытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
    formAddCard.reset();
    openPopup(popupAddCard);
}
popupAddCardOpenButton.addEventListener('click', openAddForm);

//открытие формы с картинкой
function openPreviewform(srcValue, placeValue){
  openPopup(popupPhotoPreview);
  previewName.textContent = placeValue;
  previewImg.src = srcValue;
  previewImg.alt = placeValue;
};

//закрытие всех форм
closeButtons.forEach(item => {
  const closestPopup = item.closest('.popup');
  item.addEventListener('click', () => closePopup(closestPopup));
});

//закрытие формы с картинкой по клику на фоне
function closePreviewFormByOverlay (evt){
  if (evt.target !== evt.currentTarget){
    return;
  }
  closePopup(popupPhotoPreview);
}
popupPhotoPreview.addEventListener('click', closePreviewFormByOverlay);

//добавление лайков
function toggleLikeActive(evt){
  evt.target.classList.toggle('element__like_active');
};

//добавление карточек
function createElement(srcValue, placeValue){
    const photoElement = card.cloneNode(true);
    const likeElement = photoElement.querySelector('.element__like');
    const deleteButton = photoElement.querySelector('.element__trash');
    const imgButton = photoElement.querySelector('.element__pic');
    const elementDescription = photoElement.querySelector('.element__description')
    imgButton.src = srcValue;
    imgButton.alt = placeValue;
    elementDescription.textContent = placeValue;
    likeElement.addEventListener('click', toggleLikeActive);
    deleteButton.addEventListener('click', () => photoElement.remove());
    imgButton.addEventListener('click', () => openPreviewform(srcValue, placeValue));
    return photoElement;
};
//отрисовка карточек
function drawElement(photoElement){
  elementsContainer.prepend(photoElement);
};

//добавление первых шести карточек
initialCards.forEach(item => drawElement(createElement(item.link, item.name)));

//добавление новой карточки через форму
function addCard(evt){
  evt.preventDefault();
  const cardNewPlace =  cardPlace.value;
  const cardnewSrc = cardSrc.value;
  drawElement(createElement(cardnewSrc, cardNewPlace));
  closePopup(popupAddCard);
  evt.target.reset();
};
popupAddCard.addEventListener('submit', addCard);
