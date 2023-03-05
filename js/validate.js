const showSubmitButton = (submitButton, buttonClass) => {
    submitButton.classList.add(buttonClass);
    submitButton.disabled = false;
}

const hideSubmitButton = (submitButton, buttonClass) => {
    submitButton.classList.forEach((item) => {
        if (item == buttonClass) {
            submitButton.classList.remove(item);
        }
    })
    submitButton.disabled = true;
}

const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);
    inputElement.classList.add(settings.inputTypeInvalidClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
}

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(settings.inputErrorClass);
    inputElement.classList.remove(settings.inputTypeInvalidClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
}

const isValid = (formElement, inputElement, settings) => {
    let submitButtonElement = formElement.querySelector(settings.submitButtonSelector);

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
        hideSubmitButton(submitButtonElement, settings.activeButtonClass);
    }
    else {
        hideInputError(formElement, inputElement, settings);
        if (checkEventListeners(formElement, settings)) {
            showSubmitButton(submitButtonElement, settings.activeButtonClass);
        }
    }
}

const checkEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));

    let input_valid = true;
    inputList.forEach((inputElement) => {
        if (!inputElement.validity.valid) {
            input_valid = false;
        }
    });

    return input_valid;
}

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, settings);
        });
    });
}

const enableValidation = (settings) => {
    const forms = document.querySelectorAll(settings.formSelector);

    forms.forEach((item) => {
        setEventListeners(item, settings);
    });
}