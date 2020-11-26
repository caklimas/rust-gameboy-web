export const SET_DIRECTION = Symbol('SET_DIRECTION');
export const CLEAR_DIRECTION = Symbol('CLEAR_DIRECTION');

export const setDirection = (angle: number) => ({
    type: SET_DIRECTION,
    angle
});

export const clearDirection = () => ({
    type: CLEAR_DIRECTION
});