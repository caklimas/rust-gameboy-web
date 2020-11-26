import { DirectionState } from '../state/direction';

export const SET_DIRECTION_FROM_ANGLE = Symbol('SET_DIRECTION_FROM_ANGLE');
export const SET_DIRECTION = Symbol('SET_DIRECTION');
export const CLEAR_DIRECTION = Symbol('CLEAR_DIRECTION');

export const setDirectionFromAngle = (angle: number) => ({
    type: SET_DIRECTION_FROM_ANGLE,
    angle
});

export const setDirection = (direction: DirectionState) => ({
    type: SET_DIRECTION,
    direction
});

export const clearDirection = () => ({
    type: CLEAR_DIRECTION
});