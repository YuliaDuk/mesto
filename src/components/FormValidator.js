export default class FormValidator {
  constructor(obj, formName) {
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._formName = formName;
    this._buttonElement = this._formName.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formName.querySelectorAll(this._inputSelector));
    
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
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _setEventListeners(){
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
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
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }
  enableValidation(){
    this._setEventListeners();
  }
  deleteSpanErrors(){
    this._inputList.forEach((input)=>{
      this._hideInputError(input);
    })

  }
}