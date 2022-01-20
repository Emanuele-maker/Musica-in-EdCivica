function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2)
}

function applyVectorCollision(obj1, obj2) {
    const vCollision = {
        x: obj2.position.x - obj1.position.x,
        y: obj2.position.y - obj1.position.y
    }
    const distance = Math.sqrt((obj2.position.x - obj1.position.x) * (obj2.position.x - obj1.position.x) + (obj2.position.y - obj1.position.y) * (obj2.position.y - obj1.position.y))
    const vCollisionNorm = {
        x: vCollision.x / distance,
        y: vCollision / distance
    }
    const vRelativeVelocity = {
        x: obj1.speed.x - 3,
        y: obj1.speed.y - 3
    }
    const speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y
    obj1.speed.x -= (speed * vCollisionNorm.x)
    obj1.speed.y -= (speed * vCollisionNorm.y)
}

export {
    rectIntersect,
    applyVectorCollision
}