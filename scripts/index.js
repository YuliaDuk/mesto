//переменные для попапов
const popupForm = document.querySelector('.popup_type_red');
const popupAddForm = document.querySelector('.popup_type_add');
const popupPreviewForm = document.querySelector('.popup_type_preview');
//переменные для кнопок
const popupButton = document.querySelector('.profile__button');
const plusButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close-icon');
//переменные для инпутов
const nameInput = document.querySelector('.popup__item_el_name');
const jobInput = document.querySelector('.popup__item_el_job');
const cardPlace = document.querySelector('.popup__item_el_place');
const cardSrc = document.querySelector('.popup__item_el_src');
//переменные для блока profile
const changeName = document.querySelector('.profile__name');
const changeJob = document.querySelector('.profile__description');
//переменные для элементов блока popup
const formElement = document.querySelector('.popup__form_type_red');
const previewName = document.querySelector('.popup__preview-name');
const previewImg = document.querySelector('.popup__img');
//перемнная для elements - всей грид-таблицы
const elementsContainer = document.querySelector('.elements');
//переменные для template
const photoTemplate = document.querySelector('.template').content;
const card = photoTemplate.querySelector('.element');
//массив для автоматических карточек
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

//открытие формы редактирования профиля
function openPopupForm(){
    nameInput.value = changeName.textContent;
    jobInput.value = changeJob.textContent;
    popupForm.classList.add('popup_opened');
}
popupButton.addEventListener('click', openPopupForm);

//редактирование формы профиля
function handleFormSubmit (evt) {
    evt.preventDefault();      
    changeName.textContent = nameInput.value;
    changeJob.textContent = jobInput.value;
    popupForm.classList.remove('popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit); 

//открытие формы добавления карточек
function openAddForm(){
    cardPlace.value = '';
    cardSrc.value = '';
    popupAddForm.classList.add('popup_opened');
}
plusButton.addEventListener('click', openAddForm);

//открытие формы с картинкой
function openPreviewform(srcValue, placeValue){
  popupPreviewForm.classList.add('popup_opened');
  previewName.textContent = placeValue;
  previewImg.setAttribute('src', srcValue);
};

//закрытие всех форм
closeButton.forEach(item => {
    item.addEventListener('click', function(evt){
        evt.target.closest('.popup').classList.remove('popup_opened');
    });
});

//закрытие формы с картинкой по клику на фоне
function closePreviewFormByOverlay (evt){
  if (evt.target !== evt.currentTarget){
    return;
  }
  popupPreviewForm.classList.remove('popup_opened');
}
popupPreviewForm.addEventListener('click', closePreviewFormByOverlay);

//добавление лайков
function likeActive(evt){
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
    likeElement.addEventListener('click', likeActive);
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
  if (cardNewPlace !== '' && cardnewSrc !== ''){
    drawElement(createElement(cardnewSrc, cardNewPlace));
    popupAddForm.classList.remove('popup_opened');
    evt.target.reset();
  } else {
    alert('Введите корректную ссылку и/или название');
  }
};
popupAddForm.addEventListener('submit', addCard);
