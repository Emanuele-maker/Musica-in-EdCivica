import Game from "./game/game.js"

/** @type {HTMLCanvasElement} */
const canvas = document.body.appendChild(document.createElement("canvas"))
const ctx = canvas.getContext("2d")

const game = new Game(canvas.width, canvas.height)

function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    game.resize(canvas.width, canvas.height)
    game.dialogeBox.gameWidth = window.innerWidth
    game.dialogeBox.gameHeight = window.innerHeight
}
resizeCanvas()
window.addEventListener("resize", resizeCanvas)

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    game.update()
    game.draw(ctx)

    requestAnimationFrame(render)
}
render()