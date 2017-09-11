const form = document.querySelector('#contact-form')
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const messageInput = document.querySelector('#message')

const nameFormGroup = document.querySelector('#name-form-group')
const emailFormGroup = document.querySelector('#email-form-group')
const messageFormGroup = document.querySelector('#message-form-group')

const formGroupsToValidate = [nameFormGroup, emailFormGroup, messageFormGroup]

const emptyInput = Symbol('emptyInput')
const filledInput = Symbol('filledInput')

form.addEventListener('submit', (e) => {
    debugger
    e.preventDefault()

    const formChecks = formCheck()

    for(const formGroup of formGroupsToValidate){
        notifyError(formGroup, error)
    }

    console.log('No no no nooo, don\'t post this fooorm')
})

function notifyError(formGroup, error){
    formGroup.querySelector('label').classList
        .toggle('hidden', error.findIndex(emptyInput) >= 0 )
}


function formCheck(){
    let errors = new WeakMap([
        [nameFormGroup, []],
        [emailFormGroup, []],
        [messageFormGroup, []]
    ])

    if(!nameIsFilled()){
        errors.set(nameFormGroup, [emptyInput])
    }

    if(!emailIsFilled()){
        errors.set(emailFormGroup, [emptyInput])
    }

    if(!messageIsFilled()){
        errors.set(messageFormGroup, [emptyInput])
    }

    return errors
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
    return nameInput.value.length !== 0
}
