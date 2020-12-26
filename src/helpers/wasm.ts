import { RustGameboy } from "../redux/state/rustGameboy";

let wasm: RustGameboy = null;
export async function loadWasm(): Promise<RustGameboy> {
    if (!!wasm) {
        return wasm;
    }

    try {
        const loadedWasm = await import("caklimas-rust-gameboy");
        wasm = loadedWasm;
        return wasm;
    } catch (err) {
        console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
    }
};