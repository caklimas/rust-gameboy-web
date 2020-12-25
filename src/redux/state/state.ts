import { ButtonState, defaultState as buttonState } from './buttons';
import { DirectionState, defaultState as directionState } from './direction';
import { GameboyState, defaultState as gameboyState } from './gameboy';
import { WasmState, defaultState as wasmState } from './wasm';

export interface State {
    buttons: ButtonState,
    direction: DirectionState,
    gameboy: GameboyState,
    wasm: WasmState
};

export const defaultState: State = {
    buttons: buttonState,
    direction: directionState,
    gameboy: gameboyState,
    wasm: wasmState
};