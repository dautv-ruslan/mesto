export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    _enableSubmitButton() {
        this._submitButtonElement.classList.add(this._settings.activeButtonClass);
        this._submitButtonElement.disabled = false;
    }
    
    disableSubmitButton() {
        this._submitButtonElement.classList.remove(this._settings.activeButtonClass);
        this._submitButtonElement.disabled = true;
    }
    
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
        inputElement.classList.add(this._settings.inputErrorClass);
        inputElement.classList.add(this._settings.inputTypeInvalidClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }
    
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
        inputElement.classList.remove(this._settings.inputErrorClass);
        inputElement.classList.remove(this._settings.inputTypeInvalidClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    }

    _toggleInputErrorState(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        }
        else {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
    }

    _toggleButtonState() {
        if (this._areAllInputsValid()) {
            this._enableSubmitButton();
        }
        else {
            this.disableSubmitButton();
        }
    }
    
    _areAllInputsValid() {    
        return this._inputList.every(input => input.validity.valid);
    }
    
    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._submitButtonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleButtonState();
                this._toggleInputErrorState(inputElement);
            });
        });
    }
    
    enableValidation() {
        this._setEventListeners();
    }
}
