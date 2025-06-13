export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function checkCollision(balloon, player) {
    return Phaser.Geom.Intersects.RectangleToRectangle(balloon.getBounds(), player.getBounds());
}