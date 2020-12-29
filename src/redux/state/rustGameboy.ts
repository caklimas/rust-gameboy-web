export interface RustGameboy {
    Input: any;
    run(bytes: Uint8Array): number;
    clock_frame(gameboy: number): Uint8Array;
    update_controls(gameboy: number, input: any): void;
}

export const defaultState: RustGameboy = {
    Input: null,
    run: null,
    clock_frame: null,
    update_controls: null
}