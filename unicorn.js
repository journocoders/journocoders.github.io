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
    context.scale(0.4, 0.4)
}

function update() {
    context.translate(0, 2)
    context.fillStyle = context.createPattern(image, 'repeat')
    context.fillRect(0, 0, 10000000, 10000000)
    window.requestAnimationFrame(update)
}

window.addEventListener('resize', setup)
setup()
