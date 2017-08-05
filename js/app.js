const sections = document.querySelectorAll('.section')

sections.forEach((section) => {
    section.addEventListener('click', function(){
        this.classList.add('expanded')
    });
})