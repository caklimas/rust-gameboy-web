import { DirectionState, defaultState } from '../state/direction';
import { 
    SET_DIRECTION_FROM_ANGLE,
    SET_DIRECTION,
    CLEAR_DIRECTION 
} from '../actions/direction';

const upAngle = 90;
const downAngle = 270;
const leftAngle = 180;
const rightAngle = 0;
const offset = 60;

function getDirection(angle: number): DirectionState {
    return {
        up: angle >= upAngle - offset && angle <= upAngle + offset,
        down: angle >= downAngle - offset && angle <= downAngle + offset,
        left: angle >= leftAngle - offset && angle <= leftAngle + offset,
        right: angle >= ((rightAngle - offset) + 360) || angle <= rightAngle + offset
    };
}

export function direction(state: DirectionState = defaultState, action: any) {
    switch (action.type) {
        case SET_DIRECTION_FROM_ANGLE:
            return { ...state, ...getDirection(action.angle) };
        case SET_DIRECTION:
            return { ...state, ...action.direction };
        case CLEAR_DIRECTION:
            return { ...state, ...defaultState };
        default:
            return state;
    }
};