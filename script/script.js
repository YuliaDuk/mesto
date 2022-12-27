let popupform = document.querySelector('.popup');
let addButton = document.querySelector('.profile__button');
function addForm(){
    popupform.classList.add('popup__opened');
}
addButton.addEventListener('click', addForm);

let closeButton = document.querySelector('.popup__close-icon');
function closeForm(){
    popupform.classList.remove('popup__opened');
}
closeButton.addEventListener('click', closeForm);

let formElement = document.querySelector('.popup');
let nameInput = formElement.querySelector('.popup__item_name');
let jobInput = formElement.querySelector('.popup__item_job');
let changeName = document.querySelector('.profile__name');
let changeJob = document.querySelector('.profile__description');

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    let newName = nameInput.value;
    let newJob = jobInput.value;    
    changeName.textContent = newName;
    changeJob.textContent = newJob;
}
formElement.addEventListener('submit', handleFormSubmit); 