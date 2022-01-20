import createImage from "../utils/createImage.js"

const animations = [createImage("../assets/musical-note.png"), createImage("../assets/musical-note (1).png")]

export default class MusicalNote {
    constructor(x, y, camera) {
        this.scale = {
            width: 80,
            height: 80
        }
        this.image = animations[Math.floor(Math.random() * animations.length)]
        this.position = {
            x: x,
            y: y
        }
        this.camera = camera
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x - this.camera.position.x, this.position.y - this.camera.position.y, this.scale.width, this.scale.height)
    }
    update() {}
}