import Hitbox from "./hitbox.js"
import MusicalNote from "./musical-note.js"
import { rectIntersect } from "./collision.js"
import createImage from "../utils/createImage.js"

export default class Map {
    constructor(camera) {
        this.image = createImage("../assets/map.png")
        this.position = {
            x: 0,
            y: 0
        }
        this.scale = {
            width: this.image.width * 4,
            height: this.image.height * 4
        }
        this.camera = camera
        this.musicalNotes = []
        this.hitboxes = [
            new Hitbox(568, 694, 620, 60, this.camera), // horizontal long fence
            new Hitbox(568, 752, 40, 830, this.camera), // vertical long fence
            new Hitbox(608, 1524, 565, 60, this.camera),
            new Hitbox(1132, 1264, 40, 260, this.camera), // vertical short fence
            new Hitbox(1140, 754, 48, 260, this.camera),
            new Hitbox(1000, 824, 52, 52, this.camera), // rock
            new Hitbox(1899, 375, 52, 52, this.camera),
            new Hitbox(2536, 60, 60, 116, this.camera), // little tree
            new Hitbox(2650, 356, 85, 140, this.camera), // big tree
            new Hitbox(2908, 496, 85, 140, this.camera),
            new Hitbox(3176, 308, 60, 116, this.camera),
            new Hitbox(3368, 444, 60, 116, this.camera),
            new Hitbox(3420, 600, 212, 210, this.camera), // big group of trees
            new Hitbox(4122, 44, 212, 210, this.camera),
            new Hitbox(1720, 824, 345, 56, this.camera), // horizontal short fence
            new Hitbox(1720, 880, 30, 515, this.camera),
            new Hitbox(1748, 1336, 315, 58, this.camera),
            new Hitbox(2035, 870, 28, 150, this.camera),
            new Hitbox(2035, 1148, 28, 190, this.camera),
            new Hitbox(3048, 1208, 60, 116, this.camera),
            new Hitbox(3165, 1456, 85, 140, this.camera),
            new Hitbox(2852, 1600, 60, 116, this.camera),
            new Hitbox(2512, 1184, 424, 424, this.camera),
            new Hitbox(3600, 1568, 680, 680, this.camera),
            new Hitbox(2650, 356, 85, 140, this.camera),
            new Hitbox(4660, 952, 293, 56, this.camera),
            new Hitbox(4660, 1000, 30, 150, this.camera),
            new Hitbox(4660, 1270, 30, 182, this.camera),
            new Hitbox(4692, 1404, 260, 56, this.camera),
            new Hitbox(4920, 1000, 32, 410, this.camera),
            new Hitbox(2010, 1652, 85, 140, this.camera),
            new Hitbox(1820, 2024, 85, 140, this.camera),
            new Hitbox(1818, 2288, 212, 210, this.camera),
            new Hitbox(740, 2430, 60, 116, this.camera),
            new Hitbox(348, 2732, 85, 140, this.camera),
            new Hitbox(90, 2868, 85, 140, this.camera),
            new Hitbox(745, 2870, 60, 116, this.camera),
            new Hitbox(2760, 2776, 120, 116, this.camera),
            new Hitbox(4616, 2332, 120, 116, this.camera),
            new Hitbox(3308, 2040, 52, 52, this.camera),
            new Hitbox(3372, 2172, 52, 52, this.camera),
            new Hitbox(3244, 2296, 52, 52, this.camera),
            new Hitbox(4184, 2356, 212, 210, this.camera),
            new Hitbox(3428, 2744, 212, 210, this.camera),
            new Hitbox(4780, 2736, 52, 52, this.camera),
            new Hitbox(2810, 1848, 345, 60, this.camera),
            new Hitbox(2808, 1908, 28, 130, this.camera),
            new Hitbox(2808, 2176, 28, 130, this.camera),
            new Hitbox(2808, 2308, 349, 52, this.camera),
            new Hitbox(3117, 1908, 38, 400, this.camera),
            new Hitbox(212, 2396, 320, 320, this.camera),
        ]
        this.createNotes()
    }
    generateMusicalNote() {
        const x = Math.floor(Math.random() * this.scale.width - 80)
        const y = Math.floor(Math.random() * this.scale.height - 80)
        this.hitboxes.forEach(hitbox => {
            if (rectIntersect(x, y, 80, 80, hitbox.position.x, hitbox.position.y, hitbox.scale.width, hitbox.scale.height)) {
                this.generateMusicalNote()
            }
        })
        return new MusicalNote(x, y, this.camera)
    }
    createNotes(len) {
        for (let i = 0; i < len; i++) {
            this.musicalNotes.push(this.generateMusicalNote())
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x - this.camera.position.x, this.position.x - this.camera.position.y, this.scale.width, this.scale.height)
        this.hitboxes.forEach(hitbox => {
            hitbox.draw(ctx)
        })
        this.musicalNotes.forEach(note => note.draw(ctx))
    }
    update() {
        if (this.musicalNotes.length === 0) this.createNotes(5)
    }
}