const options = {formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};
class FormValidator {
  constructor(obj, formName) {
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._formName = formName;
  }
  _hideInputError(input){
    const errorElement = this._formName.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }
  _showInputError(input){
    const errorElement = this._formName.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }
  _hasInvalidInput(){
    const inputList = Array.from(this._formName.querySelectorAll(this._inputSelector));
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _setEventListeners(){
    const inputList = Array.from(this._formName.querySelectorAll(this._inputSelector));
    this._toggleButtonState();
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }
  _toggleButtonState (){
    const buttonElement = this._formName.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput()) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }
  _isValid(input){
    if (!input.validity.valid){
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    };
  }
  enableValidation(){
    this._setEventListeners();
  }
}
const forms = document.querySelectorAll('.popup__form');
function validationFunction () {
  forms.forEach((form) => {
    const formCheck = new FormValidator(options, form);
    const checkResult = formCheck.enableValidation();
    return checkResult
  })
}
validationFunction();