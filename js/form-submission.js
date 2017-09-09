const form = document.querySelector('#contact-form')
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const messageInput = document.querySelector('#message')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log('No no no nooo, don\'t post this fooorm')
})


function formCheck(){
    return nameIsFilled() && emailIsFilled() && emailIsValid() && messageIsFilled()
}

function domInputElementIsFilled(domElement){
    return nameInput.value.length !== 0
}

function nameIsFilled(){
    return domInputElementIsFilled(nameInput)
}

function emailIsFilled(){
    return domInputElementIsFilled(emailInput)
}

function messageIsFilled(){
    return domInputElementIsFilled(messageInput)
}

