export default class Camera {
    constructor(gameWidth, gameHeight, player) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.player = player
        this.position = {
            x: 0,
            y: 0
        }
    }
    update() {
        this.position = {
            x: -(this.gameWidth / 2 - this.player.position.x),
            y: -(this.gameHeight / 2 - this.player.position.y)
        }
    }
}