import createImage from "../utils/createImage.js"

export default class Lifebar {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.image = createImage("../assets/Lifebar-1.png")
        this.scale = {
            width: 500,
            height: 90
        }
        this.imagePosition = {
            x: this.gameWidth - this.scale.width - 20,
            y: 50
        }
        this.barPosition = {
            x: this.gameWidth - this.scale.width - 20,
            y: 50
        }
        this.barScale = {
            width: 0,
            height: this.scale.height
        }
    }
    draw(ctx) {
        ctx.fillStyle = "red"
        ctx.fillRect(this.barPosition.x, this.barPosition.y, this.barScale.width, this.barScale.height)
        ctx.drawImage(this.image, this.imagePosition.x, this.imagePosition.y, this.scale.width, this.scale.height)
        ctx.fillStyle = "black"
        ctx.font = "25px Comic Sans MS"
        ctx.textAlign = "center"
    }
}