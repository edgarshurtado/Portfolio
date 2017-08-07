
const sections = document.querySelectorAll('.section')
const closeBtns = document.querySelectorAll('.collapse-btn')
const headerSection = document.querySelector('.header')
const sectionsDiv = document.querySelector('.sections')

const getElementSiblings = function(element) { // solution inspired by https://stackoverflow.com/a/7354231
    let siblings = []

    for(const child of element.parentElement.children){
        if(child !== element) siblings.push(child)
    }

    return siblings
}

sections.forEach( section => {
    section.addEventListener('click', function(){
        this.classList.add('expanded')
        sectionsDiv.classList.add('expanded')
        headerSection.classList.add('collapsed')
    });
})


closeBtns.forEach( btn => {
    btn.addEventListener('click', function(e){
        e.stopPropagation()

        console.log(getElementSiblings(this.parentElement))

        for(const element of sectionsDiv.children){
            element.classList.remove('expanded')
        }

        headerSection.classList.remove('collapsed')
        sectionsDiv.classList.remove('expanded')
    })
})