import { DirectionState, defaultState as directionState } from './direction';
import { GameboyState, defaultState as gameboyState } from './gameboy';

export interface State {
    direction: DirectionState,
    gameboy: GameboyState
};

export const defaultState: State = {
    direction: directionState,
    gameboy: gameboyState
};