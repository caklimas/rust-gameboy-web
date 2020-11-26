const upAngle = 90;
const downAngle = 270;
const leftAngle = 180;
const rightAngle = 0;
const offset = 60;

export function getDirection(angle: number): Direction {
    return {
        up: angle >= upAngle - offset && angle <= upAngle + offset,
        down: angle >= downAngle - offset && angle <= downAngle + offset,
        left: angle >= leftAngle - offset && angle <= leftAngle + offset,
        right: angle >= ((rightAngle - offset) + 360) || angle <= rightAngle + offset
    };
}

export interface Direction {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean
}