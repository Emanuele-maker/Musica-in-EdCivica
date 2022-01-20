import createImage from "../utils/createImage.js"

export default class Guide {
    constructor(x, y, camera) {
        this.camera = camera
        this.scale = {
            width: 90,
            height: 150
        }
        this.position = {
            x: x,
            y: y
        }
        this.image = createImage("../assets/girl.png")
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x - this.camera.position.x, this.position.y - this.camera.position.y, this.scale.width, this.scale.height)
    }
}