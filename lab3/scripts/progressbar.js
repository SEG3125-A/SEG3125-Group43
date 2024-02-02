// Code taken from codepen https://codepen.io/EspressoCat/pen/PoVpQdX

const progress = document.getElementById('progress')
const back = document.querySelector('.back-btn');
const next = document.querySelector('.next-btn');
const wraps = document.querySelectorAll('.text-wrap')

let currentActive = 1

next.addEventListener('click', () => {
    currentActive++
    if(currentActive > wraps.length) {
        currentActive = wraps.length
    }

    update()
})

back.addEventListener('click', () => {
    currentActive--
    if(currentActive < 1) {
        currentActive = 1
    }

    update()
})

function update() {
    wraps.forEach((wrap, index) => {
        if(index < currentActive) {
            wrap.classList.add('active')
        } else {
            wrap.classList.remove('active')
        }
    })

    const actives = document.querySelectorAll('.active')
    progress.style.width = (actives.length - 1) / (wraps.length - 1)* 80 + '%'

    if(currentActive === 1) {
        back.disabled = true
    } else if(currentActive === wraps.length) {
        next.disabled = true
    } else {
        back.disabled = false
        next.disabled = false
    }
}