
function isValid(options, formElement, inputElement){
  if (!inputElement.validity.valid){
      showInputError(options, formElement, inputElement, inputElement.validationMessage);
  } else {
      hideInputError(options,formElement, inputElement);
  };
};
const showInputError = (options, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
};
  
const hideInputError = (options, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.textContent = '';
}; 
const setEventListeners = (options, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(options, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(options, formElement, inputElement);
      toggleButtonState(options, inputList, buttonElement);
    });
  });
}; 

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(options, formElement);
  });
};
const options = {formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};
enableValidation(options); 
  
function hasInvalidInpit (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState (options, inputList, buttonElement) {
  if (hasInvalidInpit(inputList)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};

  