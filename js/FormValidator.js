export default class FormValidator {
    constructor(settings, formElement) {
        this.settings = settings;
        this._formElement = formElement;
    }

    _showSubmitButton(submitButton, buttonClass) {
        submitButton.classList.add(buttonClass);
        submitButton.disabled = false;
    }
    
    _hideSubmitButton(submitButton, buttonClass) {
        submitButton.classList.remove(buttonClass);
        submitButton.disabled = true;
    }
    
    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
        inputElement.classList.add(this.settings.inputErrorClass);
        inputElement.classList.add(this.settings.inputTypeInvalidClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.settings.errorClass);
    }
    
    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
        inputElement.classList.remove(this.settings.inputErrorClass);
        inputElement.classList.remove(this.settings.inputTypeInvalidClass);
        errorElement.classList.remove(this.settings.errorClass);
        errorElement.textContent = '';
    }
    
    _isValid(formElement, inputElement) {
        const submitButtonElement = this._formElement.querySelector(this.settings.submitButtonSelector);
    
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
            this._hideSubmitButton(submitButtonElement, this.settings.activeButtonClass);
        }
        else {
            this._hideInputError(formElement, inputElement, this.settings);
            if (this._checkEventListeners(formElement)) {
                this._showSubmitButton(submitButtonElement, this.settings.activeButtonClass);
            }
        }
    }
    
    _checkEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this.settings.inputSelector));
    
        let inputValid = true;
        inputList.forEach((inputElement) => {
            if (!inputElement.validity.valid) {
                inputValid = false;
            }
        });
    
        return inputValid;
    }
    
    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this.settings.inputSelector));
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(this._formElement, inputElement);
            });
        });
    }
    
    enableValidation() {
        this._setEventListeners();
    }
}
