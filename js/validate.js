const showSubmitButton = (submitButton, buttonClass) => {
    submitButton.classList.add(buttonClass);
    submitButton.disabled = false;
}

const hideSubmitButton = (submitButton, buttonClass) => {
    submitButton.classList.remove(buttonClass);
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
    const submitButtonElement = formElement.querySelector(settings.submitButtonSelector);

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

    let inputValid = true;
    inputList.forEach((inputElement) => {
        if (!inputElement.validity.valid) {
            inputValid = false;
        }
    });

    return inputValid;
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