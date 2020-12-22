import { ButtonState, defaultState as buttonState } from './buttons';
import { DirectionState, defaultState as directionState } from './direction';
import { GameboyState, defaultState as gameboyState } from './gameboy';

export interface State {
    buttons: ButtonState,
    direction: DirectionState,
    gameboy: GameboyState
};

export const defaultState: State = {
    buttons: buttonState,
    direction: directionState,
    gameboy: gameboyState
};