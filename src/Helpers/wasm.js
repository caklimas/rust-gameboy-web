let wasm = null;

export default async function loadWasm() {
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