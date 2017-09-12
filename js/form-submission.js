const form = document.querySelector('#contact-form')

const nameInput = document.querySelector('#name')
const nameFormGroup = document.querySelector('#name-form-group')

const emailInput = document.querySelector('#email')
const emailFormGroup = document.querySelector('#email-form-group')

const messageInput = document.querySelector('#message')
const messageFormGroup = document.querySelector('#message-form-group')

const formGroupsToValidate = [nameFormGroup, emailFormGroup, messageFormGroup]

const emptyInput = Symbol('emptyInput')
const filledInput = Symbol('filledInput')

const errorsTargetLabels = {
	[emptyInput]: 'label'
}

form.addEventListener('submit', submitHandler)

function submitHandler(e){
    e.preventDefault()

    const formChecksErrorsWeakMap = getFormErrorsWeakMap()

    for(const formGroup of formGroupsToValidate){
        notifyErrors(formGroup, formChecksErrorsWeakMap.get(formGroup))
    }
}

function notifyErrors(formGroup, errors){

	for(const errorSymbol of Reflect.ownKeys(errorsTargetLabels)){
		formGroup.querySelector(errorsTargetLabels[errorSymbol]).classList
			.toggle('hidden', errors.findIndex((error) => error === errorSymbol) === -1 )
	}
}


function getFormErrorsWeakMap(){
    let errorsMap = new WeakMap([
        [nameFormGroup, []],
        [emailFormGroup, []],
        [messageFormGroup, []]
    ])

    if(!nameIsFilled()){
        errorsMap.set(nameFormGroup, [emptyInput])
    }

    if(!emailIsFilled()){
        errorsMap.set(emailFormGroup, [emptyInput])
    }

    if(!messageIsFilled()){
        errorsMap.set(messageFormGroup, [emptyInput])
    }

    return errorsMap
}

function nameIsFilled(){
    return domInputElementIsFilled(nameInput)
}

function emailIsFilled(){
    return domInputElementIsFilled(emailInput)
}

function emailIsValid(){
    // Implement
}

function messageIsFilled(){
    return domInputElementIsFilled(messageInput)
}

function domInputElementIsFilled(domElement){
    return domElement.value.length !== 0
}
