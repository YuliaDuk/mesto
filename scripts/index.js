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
    addform.classList.add('popup_opened');
}
plusButton.addEventListener('click', addOpenForm);

//закрытие всех форм
closeButton.forEach(item => {
    item.addEventListener('click', function(evt){
        evt.target.closest('.popup').classList.remove('popup_opened');
    });
});



// function addPicture(){
//     newPic.classList.add('popupAddform_opened');
// }
// function closePicture(){
//     newPic.classList.remove('popupAddform_opened');
// }
// plusButton.addEventListener('click', addPicture);
// escButton.addEventListener('click', closePicture);

// const deleteButton = document.querySelectorAll('.element__trash');
// deleteButton.forEach(item => {
//     item.addEventListener('click', () => {
//         const deleteElement = item.closest('.element');
//         deleteElement.remove();
//     })
// });
// const Elements = document.querySelector('.elements');

// Elements.addEventListener('click', function(evt){
//     const deleteButtonElement = evt.target;
//     const deleteElement = deleteButtonElement.closest('.element');
//     deleteElement.remove();
// });