import './index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {initialCards,
options,
elementsContainer,
popupEditOpenButton,
popupAddCardOpenButton,
nameInput,
jobInput,
formEdit,
formAdd,
objectProfileEdit
} from "../utils/constants.js";

//форма профиля
const newUserInfo = new UserInfo(objectProfileEdit)
const newProfileForm = new PopupWithForm({selector: '.popup_type_red',
handleFormEdit: (object) =>{
  newUserInfo.setUserInfo(object);
}});
newProfileForm.setEventListeners();

popupEditOpenButton.addEventListener('click', ()=>{
  const profileResults = newUserInfo.getUserInfo();
  newProfileForm.open();
  nameInput.value = profileResults.name;
  jobInput.value = profileResults.description;
})

const formEditValidate = new FormValidator(options, formEdit);
formEditValidate.enableValidation();

//карточки
// function createNewPopupWithImage(item){
//   const newCard = new PopupWithImage( '.popup_type_preview');
//     newCard.open(item);
//     newCard.setEventListeners();
// }
const newPopupWithImage = new PopupWithImage('.popup_type_preview');
newPopupWithImage.setEventListeners();

const newAddedCard = new PopupWithForm({selector: '.popup_type_add', 
handleFormEdit: (item) =>{
  newSection.addItem(createCardWithImage(item).generateCard());
  formAddValidate.disableButtonState();
}});
newAddedCard.setEventListeners();
popupAddCardOpenButton.addEventListener('click', ()=>{
  newAddedCard.open();
});

function createCardWithImage (item) {
  return new Card({data: item, handleCardClick: ()=>{newPopupWithImage.open(item)}}, '.template')
}

const newSection = new Section({
  items: initialCards,
  renderer: (initialCards) =>{
    newSection.addItem(createCardWithImage(initialCards).generateCard())
  }}, elementsContainer)
  newSection.renderItems();




const formAddValidate = new FormValidator(options, formAdd);
formAddValidate.enableValidation();

