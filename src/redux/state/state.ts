import { GameboyState, defaultState as gameboyState } from './gameboy';

export interface State {
    gameboy: GameboyState
};

export const defaultState: State = {
    gameboy: gameboyState
};