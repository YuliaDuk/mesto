const popupform = document.querySelector('.popup_type_red');
const addform = document.querySelector('.popup_type_add');

const popupButton = document.querySelector('.profile__button');
const plusButton = document.querySelector('.profile__add-button');

const nameInput = document.querySelector('.popup__item_el_name');
const jobInput = document.querySelector('.popup__item_el_job');
const formElement = document.querySelector('.popup__form_type_red');
const closeButton = document.querySelectorAll('.popup__close-icon');
const changeName = document.querySelector('.profile__name');
const changeJob = document.querySelector('.profile__description');

const elementsContainer = document.querySelector('.elements');

const cardPlace = document.querySelector('.popup__item_el_place');
const cardSrc = document.querySelector('.popup__item_el_src');


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

//открытие формы ред
function popupopenForm(){
    nameInput.value = changeName.textContent;
    jobInput.value = changeJob.textContent;
    popupform.classList.add('popup_opened');
}
popupButton.addEventListener('click', popupopenForm);

//редактирование формы ред
function handleFormSubmit (evt) {
    evt.preventDefault();      
    changeName.textContent = nameInput.value;
    changeJob.textContent = jobInput.value;
    popupform.classList.remove('popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit); 

//открытие формы добавление
function addOpenForm(){
    cardPlace.value = '';
    cardSrc.value = '';
    addform.classList.add('popup_opened');
}
plusButton.addEventListener('click', addOpenForm);

//открытие формы с картинкой
const previewName = document.querySelector('.popup__preview-name');
const previewImg = document.querySelector('.popup__img');
const previewForm = document.querySelector('.popup_type_preview');
function openPreviewform(srcValue, placeValue){
  previewForm.classList.add('popup_opened');
  previewName.textContent = placeValue;
  previewImg.setAttribute('src', srcValue);

};
//закрытие всех форм
closeButton.forEach(item => {
    item.addEventListener('click', function(evt){
        evt.target.closest('.popup').classList.remove('popup_opened');
    });
});

//добавление лайков
function likeActive(evt){
  evt.target.classList.toggle('element__like_active');
};
//удаление карточки
// function deleteElement(evt){
//   evt.target.closest('.element').remove();
// };
function deleteElement(card){
  card.remove();
  
};
//добавление карточек
const photoTemplate = document.querySelector('.template').content;
const card = photoTemplate.querySelector('.element');
function createElement(srcValue, placeValue){
    const photoElement = card.cloneNode(true);
    photoElement.querySelector('.element__pic').setAttribute('src', srcValue);
    photoElement.querySelector('.element__pic').setAttribute('alt', placeValue);
    photoElement.querySelector('.element__description').textContent = placeValue;
    const elementLike = photoElement.querySelector('.element__like');
    const deleteButton = photoElement.querySelector('.element__trash');
    const imgButton = photoElement.querySelector('.element__pic');
    elementLike.addEventListener('click', likeActive);
    deleteButton.addEventListener('click', () => deleteElement(photoElement));
    imgButton.addEventListener('click', () => openPreviewform(srcValue, placeValue));
    return photoElement;
}
function drawElement(photoElement){
  elementsContainer.prepend(photoElement);
};
//добавление первых шести карточек
initialCards.forEach(item => drawElement(createElement(item.link, item.name)));

// initialCards.forEach(item => createElement(item.link, item.name));

//добавление новой карточки
function addCard(evt){
  evt.preventDefault();
  const cardNewPlace =  cardPlace.value;
  const cardnewSrc = cardSrc.value;
  if (cardNewPlace !== '' && cardnewSrc !== ''){
    drawElement(createElement(cardnewSrc, cardNewPlace));
    addform.classList.remove('popup_opened');
    evt.target.reset();
  } else {
    alert('Введите корректную ссылку и/или название');
  }
};
addform.addEventListener('submit', addCard);


// deleteButton.forEach(item => {
//     item.addEventListener('click', () => {
//         const deleteElement = item.closest('.element');
//         deleteElement.remove();
//     })
// });
// const Elements = document.querySelector('.elements');

