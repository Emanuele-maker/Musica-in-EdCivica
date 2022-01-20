import Player from "./player.js"
import Camera from "./camera.js"
import Map from "./map.js"
import {rectIntersect} from "./collision.js"
import DialogeBox from "./DialogeBox.js"
import Guide from "./guide.js"
import input from "./input.js"

let leftMouseButtonPressed = false

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.width = gameWidth
        this.height = gameHeight
        this.player = new Player(this.width, this.height, 80, 80)
        this.camera = new Camera(this.width, this.height, this.player)
        this.guide = new Guide(300, 60, this.camera)
        this.dialogeBox = new DialogeBox(window.innerWidth, window.innerHeight, this.camera)
        this.map = new Map(this.camera)
        this.objects = [this.map, this.guide, this.player, this.dialogeBox, this.camera]
        this.tutorialDid = false
        this.currentDialog = "first"
        this.state = "dialoge1"
        this.valuesToFind = ["Empatia", "Conoscenza della bellezza"]
        this.goals = ["Cerca le note musicali per migliorare la tua empatia", "Cerca le note musicali per capire meglio il vero significato di bellezza"]
        this.currentValueToFind = this.valuesToFind[this.dialogeBox.count]
        this.currentGoal = this.goals[this.dialogeBox.count]
        console.log(this.map.image)
    }
    draw(ctx) {
        this.objects.forEach(object => {
            if (Array.isArray(object)) {
                object.forEach(obj => obj.draw(ctx))
            } else {
                if (object.draw) object.draw(ctx)
            }
        })
        ctx.font = "30px Comic Sans MS"
        ctx.fillStyle = "black"
        if (this.tutorialDid) {
            ctx.textAlign = "center"
            ctx.fillText(this.currentValueToFind, this.player.lifebar.barPosition.x + this.player.lifebar.scale.width / 2, this.player.lifebar.imagePosition.y - 20)
            ctx.textAlign = "left"
            ctx.fillText(`Obiettivo: ${this.currentGoal}`, 40, 60)
            ctx.fillText("Usa le freccie direzionali per muovere il personaggio", 40, 100)
        } else {
            ctx.fillText("Clicca sullo schermo per procedere nel dialogo", 70, 60)
        }
    }
    resize(w, h) {
        this.width = w
        this.height = h
        this.objects.forEach(object => {
            if (Array.isArray(object)) {
                object.forEach(obj => {
                    if (obj.gameWidth) obj.gameWidth = this.width
                    if (obj.gameHeight) obj.gameHeight = this.height
                })
            } else {
                if (object.gameWidth) object.gameWidth = this.width
                if (object.gameHeight) object.gameHeight = this.height
            }
        })
    }
    update() {
        this.objects.forEach(object => {
            if (Array.isArray(object)) {
                object.forEach(obj => {
                    if (obj.update) obj.update()
                })
            } else {
                if (object.update) object.update()
            }
        })

        this.player.canMove = this.state === "playing"

        if (this.player.position.x <= this.map.position.x) this.player.position.x = this.map.position.x
        if (this.player.position.x + this.player.scale.width >= this.map.position.x + this.map.scale.width) this.player.position.x = this.map.position.x + this.map.scale.width - this.player.scale.width
        if (this.player.position.y <= this.map.position.y) this.player.position.y = this.map.position.y
        if (this.player.position.y + this.player.scale.height >= this.map.position.y + this.map.scale.height) this.player.position.y = this.map.position.y + this.map.scale.height - this.player.scale.height

        // this.map.hitboxes.forEach(hitbox => {
        //     if (rectIntersect(this.player.position.x, this.player.position.y, this.player.scale.width, this.player.scale.height, hitbox.position.x, hitbox.position.y, hitbox.scale.width, hitbox.scale.height)) {
        //         hitbox.color = "red"
        //         switch (this.player.direction) {
        //             case "left":
        //                     this.player.position.x = hitbox.position.x + hitbox.scale.width
        //                     this.player.currentCollision = "left"
        //                 break
        //             case "right":
        //                     this.player.position.x = hitbox.position.x - this.player.scale.width
        //                     this.player.currentCollision = "right"
        //                 break
        //             case "up":
        //                     this.player.position.y = hitbox.position.y + hitbox.scale.height
        //                     this.player.currentCollision = "up"
        //             case "down":
        //                     this.player.position.y = hitbox.position.y - this.player.scale.height
        //                     this.player.currentCollision = "down"
        //                 break
        //         }
        //         console.log(this.player.currentCollision)
        //     } else {
        //         hitbox.color = "green"
        //         this.player.currentCollision = null
        //     }
        // })

        this.map.musicalNotes.forEach((note, noteIndex) => {
            if (rectIntersect(this.player.position.x, this.player.position.y, this.player.scale.width, this.player.scale.height, note.position.x, note.position.y, note.scale.width, note.scale.height)) {
                this.map.musicalNotes.splice(noteIndex, 1)
                this.player.addEmpaty()
            }
        })

        this.dialogeBox.active = this.state.includes("dialoge")
        this.currentValueToFind = this.valuesToFind[this.dialogeBox.count]
        this.currentGoal = this.goals[this.dialogeBox.count]

        if (this.state.includes("dialoge")) {
            if (input.isMouseButtonPressed(0) && !leftMouseButtonPressed) {
                if (this.dialogeBox.msgCount === this.dialogeBox.currentDialogArray.length - 1) {
                    this.tutorialDid = true
                    this.state = "playing"
                } else {
                    this.dialogeBox.msgCount++
                    leftMouseButtonPressed = true
                }
            }
            if (!input.isMouseButtonPressed(0) && leftMouseButtonPressed) {
                leftMouseButtonPressed = false
            }
        }

        if (this.state === "playing") {
            if (this.player.lifebar.barScale.width === 420) {
                this.guide.position.x = this.player.position.x + 400
                this.guide.position.y = this.player.position.y
                this.player.stop()
                this.player.currentAnimationIndex = 0
                this.dialogeBox.count++
                this.dialogeBox.msgCount = 0
                this.dialogeBox.dialoging = true
                this.player.lifebar.barScale.width = 0
                this.state = `dialoge${this.dialogeBox.count}`
                this.tutorialDid = false
            } else {
                this.dialogeBox.dialoging = false
            }
        }
    }
}