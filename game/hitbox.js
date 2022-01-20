export default class Hitbox {
    constructor(x, y, w, h, camera) {
        this.position = {
            x: x,
            y: y,
        }
        this.camera = camera
        this.scale = {
            width: w,
            height: h
        }
        this.color = "green"
        this.visible = false
    }
    draw(ctx) {
        if (!this.visible) return
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x - this.camera.position.x, this.position.y - this.camera.position.y, this.scale.width, this.scale.height)
    }
}