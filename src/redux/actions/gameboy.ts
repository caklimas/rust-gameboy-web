export const LOAD_ROM = Symbol('LOAD_ROM');

export const loadRom = (pointer: number) => {
    return {
        type: LOAD_ROM,
        pointer
    };
}