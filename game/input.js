class Input {
    constructor() {
        this.mouseButtonsPressed = []
        this.keysPressed = []
        this.mousePosition = {
            x: null,
            y: null
        }
        this.mouseSpeed = {
            x: null,
            y: null
        }
        this.previousTouch = null
        window.addEventListener("keydown", (event) => {
            if (!this.keysPressed.includes(event.keyCode)) this.keysPressed.push(event.keyCode)
        })
        window.addEventListener("keyup", (event) => {
            const keyIndex = this.keysPressed.indexOf(event.keyCode)
            if (keyIndex === -1) return
            this.keysPressed.splice(keyIndex, 1)
        })
        window.addEventListener("mousedown", (event) => {
            this.mousePosition = {
                x: event.offsetX,
                y: event.offsetY
            }
            if (!this.mouseButtonsPressed.includes(event.button)) {
                this.mouseButtonsPressed.push(event.button)
            }
        })
        window.addEventListener("mouseup", (event) => {
            const buttonIndex = this.mouseButtonsPressed.indexOf(event.button)
            if (buttonIndex === -1) return
            this.mouseButtonsPressed.splice(buttonIndex, 1)
        })
        window.addEventListener("mousemove", (event) => {
            this.mousePosition = {
                x: event.offsetX,
                y: event.offsetY
            }
            this.mouseSpeed = {
                x: event.movementX,
                y: event.movementY
            }
        })
        window.addEventListener("touchstart", (event) => {
            const touch = event.touches[0]
            this.mousePosition = {
                x: touch.pageX,
                y: touch.pageY
            }
            if (!this.mouseButtonsPressed.includes(0)) this.mouseButtonsPressed.push(0)
        })
        window.addEventListener("touchend", (event) => {
            if (event.touches.length === 0) this.previousTouch = null
            const index = this.mouseButtonsPressed.indexOf(0)
            if (index === -1) return
            this.mouseButtonsPressed.splice(index, 1)
        })
        window.addEventListener("touchmove", (event) => {
            const touch = event.touches[0]
            this.mousePosition = {
                x: touch.pageX,
                y: touch.pageY
            }
            if (this.previousTouch) {
                this.mouseSpeed = {
                    x: touch.pageX - this.previousTouch.pageX,
                    y: touch.pageY - this.previousTouch.pageY
                }
            }
            this.previousTouch = touch
        })
    }
    keyPressed(keyCode) {
        return this.keysPressed.includes(keyCode)
    }
    isMouseButtonPressed(button) {
        return this.mouseButtonsPressed.includes(button)
    }
    get mouseX() {
        return this.mousePosition.x
    }
    get mouseY() {
        return this.mousePosition.y
    }
    get mouseSpeedX() {
        return this.mouseSpeed.x
    }
    get mouseSpeedY() {
        return this.mouseSpeed.y
    }
}

const input = new Input()
export default input