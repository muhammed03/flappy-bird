/* eslint-disable no-param-reassign */
// An engine that implements the laws of physics
// Now the entity will fall with acceleration
export default class PhysicsEngine {
    constructor({ gravity }) {
        this._gravity = gravity;
    }

    update(entity, delta) {
        if (entity.falling) {
            entity.speed += this._gravity * delta;
            entity.y += entity.speed * delta;
        }
    }
}