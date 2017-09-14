const form = document.querySelector('#contact-form')

const nameInput = document.querySelector('#name')
const nameFormGroup = document.querySelector('#name-form-group')

const emailInput = document.querySelector('#email')
const emailFormGroup = document.querySelector('#email-form-group')

const messageInput = document.querySelector('#message')
const messageFormGroup = document.querySelector('#message-form-group')

const formGroupsToValidate = [nameFormGroup, emailFormGroup, messageFormGroup]

const emptyInput = Symbol('emptyInput')
const invalidEmail = Symbol('invalidEmail')
const filledInput = Symbol('filledInput')

const errorsTargetLabels = {
    [emptyInput]: 'label.empty-input',
    [invalidEmail]: 'label.invalid-email'
}

form.addEventListener('submit', submitHandler)

function submitHandler(e){
    e.preventDefault()

    const formChecksErrorsWeakMap = getFormErrorsWeakMap()

    for(const formGroup of formGroupsToValidate){
        notifyErrors(formGroup, formChecksErrorsWeakMap.get(formGroup))
    }

    if(!isAnyErrorLabelBeenDisplayed()){
        form.submit()
    }

}

function notifyErrors(formGroup, errors){

	for(const errorSymbol of Reflect.ownKeys(errorsTargetLabels)){
        const errorLabel = formGroup.querySelector(errorsTargetLabels[errorSymbol])
        if(errorLabel !== null){
             errorLabel
                .classList
                .toggle('hidden', errors.findIndex((error) => error === errorSymbol) === -1 )
        }
	}
}


function getFormErrorsWeakMap(){
    let errorsMap = new WeakMap([
        [nameFormGroup, []],
        [emailFormGroup, []],
        [messageFormGroup, []]
    ])

    errorsMap.set(nameFormGroup, getNameErrors())
    errorsMap.set(emailFormGroup, getEmailErrors())
    errorsMap.set(messageFormGroup, getMessageErrors())

    return errorsMap
}

function getNameErrors(){

    let nameErrors = []
    if(!nameIsFilled()){
        nameErrors.push(emptyInput)
    }

    return nameErrors
}

function getEmailErrors(){
    let emailErrors = []

    if(!emailIsFilled()){
        emailErrors.push(emptyInput)
    }else if(!emailIsValid()){
        emailErrors.push(invalidEmail)
    }

    return emailErrors
}

function getMessageErrors(){
    let messageErrors = []

    if(!messageIsFilled()){
        messageErrors.push(emptyInput)
    }

    return messageErrors
}

function nameIsFilled(){
    return domInputElementIsFilled(nameInput)
}

function emailIsFilled(){
    return domInputElementIsFilled(emailInput)
}

function emailIsValid(){
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return re.test(emailInput.value)
}

function messageIsFilled(){
    return domInputElementIsFilled(messageInput)
}

function domInputElementIsFilled(domElement){
    return domElement.value.length !== 0
}

function isAnyErrorLabelBeenDisplayed(){
    return document.querySelector('.form-group label:not(.hidden)') !== null
}
