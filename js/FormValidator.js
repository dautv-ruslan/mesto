export default class FormValidator {
    constructor(settings, formElement) {
        this.settings = settings;
        this._formElement = formElement;
    }

    _showSubmitButton(submitButton, buttonClass) {
        submitButton.classList.add(buttonClass);
        submitButton.disabled = false;
    }
    
    hideSubmitButton(submitButton, buttonClass) {
        submitButton.classList.remove(buttonClass);
        submitButton.disabled = true;
    }
    
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
        inputElement.classList.add(this.settings.inputErrorClass);
        inputElement.classList.add(this.settings.inputTypeInvalidClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.settings.errorClass);
    }
    
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
        inputElement.classList.remove(this.settings.inputErrorClass);
        inputElement.classList.remove(this.settings.inputTypeInvalidClass);
        errorElement.classList.remove(this.settings.errorClass);
        errorElement.textContent = '';
    }
    
    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
            this._hideSubmitButton(this._submitButtonElement, this.settings.activeButtonClass);
        }
        else {
            this._hideInputError(inputElement, this.settings);
            if (this._checkEventListeners()) {
                this._showSubmitButton(this._submitButtonElement, this.settings.activeButtonClass);
            }
        }
    }
    
    _checkEventListeners() {    
        let inputValid = true;
        this._inputList.forEach((inputElement) => {
            if (!inputElement.validity.valid) {
                inputValid = false;
            }
        });
    
        return inputValid;
    }
    
    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this.settings.inputSelector));
        this._submitButtonElement = this._formElement.querySelector(this.settings.submitButtonSelector);
    
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
            });
        });
    }
    
    enableValidation() {
        this._setEventListeners();
    }
}
