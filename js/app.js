const sections = document.querySelectorAll('.section')
const closeBtns = document.querySelectorAll('.collapse-btn')
const brandSection = document.querySelector('.brand')
const sectionsDiv = document.querySelector('.sections')

const getElementSiblings = function(element) { // solution inspired by https://stackoverflow.com/a/7354231

    const siblingsArray = Array.from(element.parentElement.children)

    return siblingsArray.filter( child => {
        return child !== element
    })
}

const expandSection = function(section){
    section.classList.add('expanded')
    section.querySelector('.expanded-card-content').setAttribute('style', 'display:none;')
    setTimeout(() => {section.querySelector('.expanded-card-content').removeAttribute('style')}, 500)
    sectionsDiv.classList.add('expanded')
    brandSection.classList.add('collapsed')

}

const collapseSections = function(sections){
    for(const section of sections){
        if(section.classList.contains('expanded')){
            section.addEventListener('click', expandClickHandler)
            section.classList.remove('expanded')
        }
    }
}

const expandClickHandler = function(){
    expandSection(this)
    collapseSections(getElementSiblings(this))
    this.removeEventListener('click', expandClickHandler)
}

sections.forEach( section => {
    section.addEventListener('click', expandClickHandler);
})


closeBtns.forEach( btn => {
    btn.addEventListener('click', function(e){
        e.stopPropagation() // Avoid bubbling to the section div

        collapseSections([sectionsDiv, ...sectionsDiv.children])
        brandSection.classList.remove('collapsed')
    })
})