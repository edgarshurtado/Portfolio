const sections = document.querySelectorAll('.section')
const closeBtns = document.querySelectorAll('.collapse-btn')
const brandSection = document.querySelector('.brand')
const sectionsDiv = document.querySelector('.sections')

const getElementSiblings = function(element) { // solution inspired by https://stackoverflow.com/a/7354231

    const siblingsArray = [].slice.call(element.parentElement.children)

    return siblingsArray.filter( child => {
        return child !== element
    })
}

const expandSection = function(section){
    section.classList.add('expanded')
    sectionsDiv.classList.add('expanded')
    brandSection.classList.add('collapsed')

}

const collapseSections = function(sections){
    for(const section of sections){
        section.classList.remove('expanded')
    }
}

const expandClickHandler = function(){
    expandSection(this)
    collapseSections(getElementSiblings(this))
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