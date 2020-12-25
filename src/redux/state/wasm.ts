import { RustGameboy } from '../../helpers/wasm';

export interface WasmState {
    rustGameboy: RustGameboy;
}

export const defaultState: WasmState = {
    rustGameboy: null
}