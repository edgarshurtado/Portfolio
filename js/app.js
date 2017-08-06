
const sections = document.querySelectorAll('.section')
const closeBtns = document.querySelectorAll('.collapse-btn')
const headerSection = document.querySelector('.header')
const sectionsDiv = document.querySelector('.sections')

sections.forEach((section) => {
    section.addEventListener('click', function(){
        this.classList.add('expanded')
        sectionsDiv.classList.add('expanded')
        headerSection.classList.add('collapsed')
    });
})


closeBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
        e.stopPropagation()
        this.parentElement.classList.remove('expanded')
        headerSection.classList.remove('collapsed')
        sectionsDiv.classList.remove('expanded')
    })
})