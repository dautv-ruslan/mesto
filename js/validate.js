const showSubmitButton = (submitButton) => {
    submitButton.classList.add(submitButton.classList[0] + '_state_enabled');
    submitButton.disabled = false;
}

const hideSubmitButton = (submitButton) => {
    submitButton.classList.forEach(function(item) {
        if (item.indexOf('_state_enabled') > 0) {
            submitButton.classList.remove(item);
        }
        submitButton.disabled = true;
    })
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
}

const isValid = (formElement, inputElement) => {
    const submitButtonElement = formElement.querySelector('input[type="submit"]');

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
        hideSubmitButton(submitButtonElement);
    }
    else {
        hideInputError(formElement, inputElement);
        if (checkEventListeners(formElement)) {
            showSubmitButton(submitButtonElement);
        }
    }
}

const checkEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    let input_valid = true;
    inputList.forEach((inputElement) => {
        if (!inputElement.validity.valid) {
            input_valid = false;
        }
    });

    return input_valid;
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
        });
    });
}