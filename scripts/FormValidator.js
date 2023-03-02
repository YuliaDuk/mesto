export class FormValidator {
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
    if (this._hasInvalidInput()) {
      this.disableButtonState();
    } else {
      this._buttonElement = this._formName.querySelector(this._submitButtonSelector);
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }
  _isValid(input){
    if (!input.validity.valid){
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    };
  }
  disableButtonState(){
    this._buttonElement = this._formName.querySelector(this._submitButtonSelector);
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }
  enableValidation(){
    this._setEventListeners();
  }
}