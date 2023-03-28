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
formImg,
objectProfileEdit,
imgEdit
} from "../utils/constants.js";

// //запросы на сервер
// function newinit(){
const initcard = [{},{},{}]
fetch('https://mesto.nomoreparties.co/v1/cohort-63/cards', {
    headers: {
      authorization: '56a6b55a-fd33-4c3c-8624-42a430500012'
    }
  })
  .then(res => res.json())
  .then((res)=>{
    // console.log(res)
    for (let i = 0; i<3; i++){
      initcard[i].link = res[i].link;
      initcard[i].name = res[i].name
    }
  })
console.log(initcard)
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

//фото профиля

const newImgForm = new PopupWithForm({selector: '.popup_type_imgred',
handleFormEdit:()=>{

}});
newImgForm.setEventListeners();
imgEdit.addEventListener('click', ()=>{
  newImgForm.open();
})
const formImgValidate = new FormValidator(options, formImg);
formImgValidate.enableValidation();

//подтверждение удаления

const newConfirm = new PopupWithForm({selector: '.popup_type_confirm',
handleFormEdit: ()=>{

}});
newConfirm.setEventListeners();


//карточки

const newPopupWithImage = new PopupWithImage('.popup_type_preview');
newPopupWithImage.setEventListeners();

const newAddedCard = new PopupWithForm({selector: '.popup_type_add', 
handleFormEdit: (item) =>{
  newSection.addItem(createCardWithImage(item));
  formAddValidate.disableButtonState();
}});
newAddedCard.setEventListeners();
popupAddCardOpenButton.addEventListener('click', ()=>{
  newAddedCard.open();
});

function createCardWithImage (item) {
  return new Card( item,  ()=>{newPopupWithImage.open(item)}, '.template').generateCard();
}

const newSection = new Section(initcard, createCardWithImage, elementsContainer)
 newSection.renderItems();

const formAddValidate = new FormValidator(options, formAdd);
formAddValidate.enableValidation();


   

