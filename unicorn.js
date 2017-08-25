var canvas = document.querySelector('canvas')
var context = canvas.getContext('2d')
var image = new Image()
image.src = 'unicorn.png'
image.addEventListener('load', update)

function setup() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    context.translate(-1000000, -100000)
    context.rotate(-30 * Math.PI / 180)
}

function update() {
    var pattern = context.createPattern(image, 'repeat')
    context.translate(0, 0.5)
    context.fillStyle = pattern
    context.fillRect(0, 0, 10000000, 10000000)
    window.requestAnimationFrame(update)
}

window.addEventListener('resize', setup)
setup()
