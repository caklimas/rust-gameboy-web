import { SET_RUST_GAMEBOY } from '../actions/wasm';
import { WasmState, defaultState } from '../state/wasm';

export function buttons(state: WasmState = defaultState, action: any) {
    switch(action.type) {
        case SET_RUST_GAMEBOY:
            return { ...state, ...action.buttons };
        default:
            return state;
    }
}