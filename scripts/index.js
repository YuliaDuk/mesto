let popupform = document.querySelector('.popup');
let addButton = document.querySelector('.profile__button');
let nameInput = document.querySelector('.popup__item_type_name');
let jobInput = document.querySelector('.popup__item_type_job');
let formElement = document.querySelector('.popup__container');
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