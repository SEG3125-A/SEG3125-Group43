window.addEventListener('scroll', function (){
    const nav = document.querySelector('.navbar');
    nav.classList.add("scrolled");
    if(window.scrollY === 0){
        nav.classList.remove("scrolled");
    }
})