import createImage from "../utils/createImage.js"
import input from "./input.js"
import Lifebar from "./lifebar.js"

export default class Player {
    constructor(gameWidth, gameHeight, x, y) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.scale = {
            width: 80,
            height: 137
        }
        this.position = {
            x: x,
            y: y
        }
        this.direction = ""
        this.isMovingLeft = false
        this.idleAnimation = {
            frames: [],
            frameLength: 20,
            currentFrameIndex: 0
        }
        this.runningAnimation = {
            frames: [],
            frameLength: 20,
            currentFrameIndex: 0
        }
        this.speed = {
            x: 0,
            y: 0
        }
        this.currentCollision = null
        this.collisionSet = false
        this.animations = [this.idleAnimation, this.runningAnimation]
        this.currentAnimationIndex = 0
        this.changeFrameCount = 0
        this.changeFrameMaxFrames = 2
        this.maxHorizontalSpeed = 5.5
        this.maxVerticalSpeed = 5.5
        this.currentAnimation = this.animations[this.currentAnimationIndex]
        this.generateAnimations()
        this.lifebar = new Lifebar(window.innerWidth, window.innerHeight)
        this.empaty = 0
    }
    generateAnimations() {
        // idle
        const idleAnimationPath = "../assets/Main Character/idle/skeleton-idle_"
        let currentIdlePath;
        for (let i = 0; i <= this.idleAnimation.frameLength; i++) {
            currentIdlePath = `${idleAnimationPath}${i}.png`
            this.idleAnimation.frames.push(createImage(currentIdlePath))
        }

        // running
        const runningAnimationPath = "../assets/Main Character/run/skeleton-run_"
        let currentRunningPath;
        for (let i = 0; i <= this.runningAnimation.frameLength; i++) {
            currentRunningPath = `${runningAnimationPath}${i}.png`
            this.runningAnimation.frames.push(createImage(currentRunningPath))
        }
    }
    moveLeft() {
        this.speed.x = -this.maxHorizontalSpeed
        this.currentAnimationIndex = 1
        this.direction = "left"
    }
    moveRight() {
        this.speed.x = this.maxHorizontalSpeed
        this.currentAnimationIndex = 1
        this.direction = "right"
    }
    moveUp() {
        this.speed.y = -this.maxVerticalSpeed
        this.currentAnimationIndex = 1
        this.direction = "up"
    }
    moveDown() {
        this.speed.y = this.maxVerticalSpeed
        this.currentAnimationIndex = 1
        this.direction = "down"
    }
    stopX() {
        this.speed.x = 0
    }
    stopY() {
        this.speed.y = 0
    }
    stop() {
        this.stopX()
        this.stopY()
        this.currentAnimationIndex = 0
    }
    animate() {
        if (this.changeFrameCount === this.changeFrameMaxFrames) {
            if (this.currentAnimation.currentFrameIndex === this.currentAnimation.frameLength) {
                this.currentAnimation.currentFrameIndex = 0
            } else {
                this.currentAnimation.currentFrameIndex++
            }
            this.changeFrameCount = 0
        } else {
            this.changeFrameCount++
        }
        this.currentAnimation = this.animations[this.currentAnimationIndex]
    }
    draw(ctx) {
        this.animate()
        if (this.isMovingLeft) {
            ctx.save()
            ctx.translate(this.position.x - this.camera.x + this.scale.width / 2, this.position.y - this.camera.y + this.scale.height / 2)
            ctx.scale(-1, 1)
            ctx.drawImage(this.currentAnimation.frames[this.currentAnimation.currentFrameIndex], -this.scale.width / 2, -this.scale.height / 2, this.scale.width, this.scale.height)
            ctx.restore()
        } else {
            ctx.drawImage(this.currentAnimation.frames[this.currentAnimation.currentFrameIndex], this.position.x - this.camera.x, this.position.y - this.camera.y, this.scale.width, this.scale.height)
        }
        this.lifebar.draw(ctx)
    }
    addEmpaty() {
        this.empaty++
        if (this.lifebar.barScale.width === 400) {
            this.lifebar.barScale.width += 20
        } else {
            this.lifebar.barScale.width += 40
        }
    }
    update() {
        // camera
        this.camera = {
            x: -(this.gameWidth / 2 - this.position.x),
            y: -(this.gameHeight / 2 - this.position.y)
        }

        // movement
        if (!this.canMove) return
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        this.isMovingLeft = this.speed.x < 0

        if (input.keyPressed(37) || input.keyPressed(65)) {
            this.moveLeft()
        } else {
            this.isMovingLeft = false
        }
        if (input.keyPressed(39) || input.keyPressed(68)) {
            this.moveRight()
        }
        if (input.keyPressed(38) || input.keyPressed(87)) {
            this.moveUp()
        }
        if (input.keyPressed(40) || input.keyPressed(83)) {
            this.moveDown()
        }
        if (!input.keyPressed(37) && !input.keyPressed(65) && !input.keyPressed(39) && !input.keyPressed(68)) {
            this.stopX()
        }
        if (!input.keyPressed(38) && !input.keyPressed(87) && !input.keyPressed(40) && !input.keyPressed(83)) {
            this.stopY()
        }
        if (!input.keyPressed(37) && !input.keyPressed(65) && !input.keyPressed(39) && !input.keyPressed(68) && !input.keyPressed(38) && !input.keyPressed(87) && !input.keyPressed(40) && !input.keyPressed(83)) {
            this.stop()
        }
    }
}