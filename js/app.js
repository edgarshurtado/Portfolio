const sections = document.querySelectorAll('.section')
const closeBtns = document.querySelectorAll('.collapse-btn')

sections.forEach((section) => {
    section.addEventListener('click', function(){
        this.classList.add('expanded')
    });
})


closeBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
        e.stopPropagation()
        this.parentElement.classList.remove('expanded')
    })
})