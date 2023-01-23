let popupform = document.querySelector('.popup');
let addButton = document.querySelector('.profile__button');
let nameInput = document.querySelector('.popup__item_type_name');
let jobInput = document.querySelector('.popup__item_type_job');
let formElement = document.querySelector('.popup__form');
let closeButton = document.querySelector('.popup__close-icon');
let changeName = document.querySelector('.profile__name');
let changeJob = document.querySelector('.profile__description');

function addForm(){
    nameInput.value = changeName.textContent;
    jobInput.value = changeJob.textContent;
    popupform.classList.add('popup_opened');
}
addButton.addEventListener('click', addForm);

function closeForm(){
    popupform.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closeForm);

function handleFormSubmit (evt) {
    evt.preventDefault();      
    changeName.textContent = nameInput.value;
    changeJob.textContent = jobInput.value;
    closeForm();
}
formElement.addEventListener('submit', handleFormSubmit); 

const plusButton = document.querySelector('.profile__add-button');
const escButton = document.querySelector('.popupAddform__close-icon');
const newPic = document.querySelector('.popupAddform')
function addPicture(){
    newPic.classList.add('popupAddform_opened');
}
function closePicture(){
    newPic.classList.remove('popupAddform_opened');
}
plusButton.addEventListener('click', addPicture);
escButton.addEventListener('click', closePicture);