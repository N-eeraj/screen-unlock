const time = document.getElementById('time')
const date = document.getElementById('date')
const day = document.getElementById('day')

const setTime = () => {
    const d = new Date

    time.innerText = d.toLocaleTimeString().slice(0, 5)
    date.innerText = d.toLocaleDateString()
    day.innerText = d.toLocaleString('en-us', {  weekday: 'long' })
}

setTime()

// check touch support
if (!(
    ( 'ontouchstart' in window ) ||
    ( navigator.maxTouchPoints > 0 ) ||
    ( navigator.msMaxTouchPoints > 0 )
)) {
    alert('Your device doesn\'t support touch, which is required to use this project.')
}