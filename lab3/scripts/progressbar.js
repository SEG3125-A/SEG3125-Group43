// Code taken from codepen https://codepen.io/EspressoCat/pen/PoVpQdX

const progress = document.getElementById('progress')
const back = document.querySelector('#back-btn');
const next = document.querySelector('.navigation .next-btn');
const wraps = document.querySelectorAll('.text-wrap')
const activeWraps = document.querySelectorAll('.grid-section');

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

    const actives = document.querySelectorAll('.text-wrap.active')
    progress.style.width = (actives.length - 1) / (wraps.length - 1)* 80 + '%'

    // Check if there are items in the cart
    if (cart.length >= 1) {
        next.disabled = false
        if(currentActive === 1) {
            back.disabled = true
            next.disabled = false
        } else if(currentActive === wraps.length) {
            next.disabled = true
        } else {
            back.disabled = false
            next.disabled = false
        }
    } else {
        // If there are no items in the cart, disable both buttons
        back.disabled = true
        next.disabled = true
    }

    // Scroll to the wrap corresponding to currentActive
    const activeWrap = activeWraps[currentActive - 1];
    if (activeWrap) {
        activeWrap.scrollIntoView({ behavior: 'smooth' });
    }
}