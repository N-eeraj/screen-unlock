const phone = document.getElementById('phone')

const time = document.getElementById('time')
const date = document.getElementById('date')
const day = document.getElementById('day')

const swipable = document.getElementById('swipable')
const swiper = document.getElementById('swiper_button')

let unlockStart = null
let isLocked = true

const setTime = () => {
    const d = new Date
    time.innerText = d.toLocaleTimeString('en-us').split(':').slice(0, 2).join(':')
    date.innerText = d.toLocaleDateString()
    day.innerText = d.toLocaleString('en-us', {  weekday: 'long' })
}

const unlockTouchStart = ({ changedTouches }) => {
    unlockStart = changedTouches[0].screenX
}

const unlockTouchMove = ({ changedTouches }) => {
    let swipe = changedTouches[0].screenX - unlockStart
    if (swipe < 0)
        swipe = 0
    swipable.style.marginLeft = `${swipe}px`
}

const unlockTouchEnd = ({ changedTouches }) => {
    swipable.style.transitionDuration = '800ms'
    if (changedTouches[0].screenX - unlockStart < swipable.clientWidth * 0.4)
        swipable.style.marginLeft = '0px'
    else {
        swipable.style.marginLeft = '380px'
        setTimeout(() => {
            phone.classList.add('unlocked')
            isLocked = false
        }, 400)
    }
    unlockStart = null
    setTimeout(() => {
        swipable.style.transitionDuration = '0ms'
    }, 100)
}


const lockScreen = () => {
    if (!isLocked) {
        phone.classList.remove('unlocked')
        swipable.style.marginLeft = '0px'
    }
}

// check touch support
if (
    ( 'ontouchstart' in window ) ||
    ( navigator.maxTouchPoints > 0 ) ||
    ( navigator.msMaxTouchPoints > 0 )
) {

    swiper.addEventListener('touchstart', unlockTouchStart)
    swiper.addEventListener('touchmove', unlockTouchMove)
    swiper.addEventListener('touchend', unlockTouchEnd)
    
    phone.addEventListener('dblclick', lockScreen)
}
else {
    alert('Your device doesn\'t support touch, which is required to use this project.')
}

setTime()
