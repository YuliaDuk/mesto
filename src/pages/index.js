import './index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {options,
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

const api = new Api({baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63', 
headers: {
  authorization: '56a6b55a-fd33-4c3c-8624-42a430500012',
  'Content-Type': 'application/json'}
});

const newUserInfo = new UserInfo(objectProfileEdit);
const newPopupWithSubmit = new PopupWithConfirmation('.popup_type_confirm');
const newPopupWithImage = new PopupWithImage('.popup_type_preview');
newPopupWithSubmit.setEventListeners();
newPopupWithImage.setEventListeners();

function renderLoading(isLoading, selector, initialText){
  if (isLoading){
    document.querySelector(selector).querySelector('.popup__button').textContent = 'Сохранение';
  }else{
    document.querySelector(selector).querySelector('.popup__button').textContent = initialText;
  }
}

Promise.all([api.getProfileInfo(), api.getCards()])
.then(([userData, cards])=>{
  newUserInfo.setUserInfo({firstname: userData.name, job: userData.about});
  newUserInfo.setNewImg({newimg: userData.avatar});
  newSection.renderItems(cards, userData._id);
})
.catch((err)=>{
  console.log(`Ошибка: ${err}`);
})

//редактируем профиль и результат отправляем на сервер
const newProfileForm = new PopupWithForm({
selector: '.popup_type_red', 
handleFormEdit: (object) =>{
  renderLoading(true, '.popup_type_red', 'Сохранить');
  api.redProfile(object)
  .then(()=>{
    newUserInfo.setUserInfo(object);
  })
  .finally(()=>{
    renderLoading(false, '.popup_type_red', 'Сохранить');
  })
  .catch((err)=>{
    console.log(`Ошибка: ${err}`);
  })
}});
newProfileForm.setEventListeners();

//подставляем данные из полей в форму
function renderNewProfileData(){
  const profileResults = newUserInfo.getUserInfo();
  newProfileForm.open();
  nameInput.value = profileResults.name;
  jobInput.value = profileResults.description;
}
popupEditOpenButton.addEventListener('click', renderNewProfileData)

//фото профиля
const newImgForm = new PopupWithForm({
selector: '.popup_type_imgred',
handleFormEdit:(object)=>{
  formImgValidate.disableButtonState();
  renderLoading(true, '.popup_type_imgred', 'Сохранить');
  api.redImgProfile(object)
  .then(()=>{
    newUserInfo.setNewImg(object);
  })
  .catch((err)=>{
    console.log(`Ошибка: ${err}`)
  })
  .finally(()=>{
    renderLoading(false, '.popup_type_imgred', 'Сохранить');
  })
}});
newImgForm.setEventListeners();
function openImgEditForm(){
  formImgValidate.deleteSpanErrors();
  newImgForm.open();
}
imgEdit.addEventListener('click', openImgEditForm)


//карточки

function handleDelClick(card){ 
  newPopupWithSubmit.deleteCardWithSubmit(()=>{
    api.deleteCard(card._id)
    .then(()=>{
      card.deleteCardFromPage();
    })
    .catch((err)=>{
      console.log(`Ошибка: ${err}`)
    })
  })
  newPopupWithSubmit.open();
}

function toggleLike(card){ 
  api.toggleApiLikes(card.getCardInfo(), card._id)
  .then((res)=>{
    card.newLikesData(res)
  })
  .catch((err)=>{
    console.log(`Ошибка: ${err}`)
  })
}

function createCardWithImage (item, myId) {
  return new Card( item,  ()=>{newPopupWithImage.open(item)}, '.template',toggleLike, handleDelClick, myId).generateCard();
}

const newSection = new Section(createCardWithImage, elementsContainer);
const newAddedCard = new PopupWithForm({selector: '.popup_type_add', 
handleFormEdit: (item) =>{
  renderLoading(true, '.popup_type_add', 'Создать')
  formAddValidate.disableButtonState();
  api.addNewCard(item)
    .then((res)=>{
      newSection.addItem(createCardWithImage(res, res.owner._id));
    })
    .catch((err)=>{
      console.log(`Ошибка: ${err}`)
    })
    .finally(()=>{
      renderLoading(false, '.popup_type_add', 'Создать')
    })
 }})
newAddedCard.setEventListeners();

function openFormAddNewCard(){
  formAddValidate.deleteSpanErrors();
  newAddedCard.open();
}
popupAddCardOpenButton.addEventListener('click', openFormAddNewCard);


//валидация
const formEditValidate = new FormValidator(options, formEdit);
formEditValidate.enableValidation();
const formAddValidate = new FormValidator(options, formAdd);
formAddValidate.enableValidation();
const formImgValidate = new FormValidator(options, formImg);
formImgValidate.enableValidation();
