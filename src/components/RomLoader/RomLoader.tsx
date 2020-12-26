import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import { connect } from 'react-redux';

import './RomLoader.scss';
import { loadRom } from '../../redux/actions/gameboy';
import { loadWasm } from '../../helpers/wasm';
import { State } from '../../redux/state/state';
import { RustGameboy } from '../../redux/state/rustGameboy';

export type RomLoaderProps = RomLoaderStateProps & RomLoaderDispatchProps;
export interface RomLoaderStateProps {
    pointer: number;
}

export interface RomLoaderDispatchProps {
    loadRom: (pointer: number) => any;
}

const RomLoader = (props: RomLoaderProps) => {
    const [gameboy, setGameboy] = useState<RustGameboy>(null);
    useEffect(() => {
        const getGameboy = async () => {
            const gameboy = await loadWasm();
            setGameboy(gameboy);
        };

        getGameboy();
    });

    if (!!props.pointer)
        return null

    return (
        <DropdownButton 
            className='gameboy-rom-loader'
            variant='secondary'
            id="dropdown-basic-button"
            title="Select ROM to play"
        >
            <Dropdown.Item onClick={async () => await readFile(props, gameboy, 'cpu_instrs.gb')}>
                CPU All Tests
            </Dropdown.Item>
            <Dropdown.Item onClick={async () => await readFile(props, gameboy, 'Dr. Mario.gb')}>
                Dr. Mario
            </Dropdown.Item>
            <Dropdown.Item onClick={async () => await readFile(props, gameboy, 'Super Mario Land.gb')}>
                Super Mario Land
            </Dropdown.Item>
            <Dropdown.Item onClick={async () => await readFile(props, gameboy, 'Tetris.gb')}>
                Tetris
            </Dropdown.Item>
        </DropdownButton>
    );
}

const readFile = async (
    props: RomLoaderProps,
    gameboy: RustGameboy, 
    fileName: string
) => {
    if (!gameboy)
        return;

    const response = await fetch(`/roms/${fileName}`);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let gb = gameboy.run(bytes);
    props.loadRom(gb);
};

const mapStateToProps = (state: State) => {
    return {
        pointer: state.gameboy.pointer
    };
}; 

const mapDispatchToProps = (dispatch: any) => ({
    loadRom: (pointer: number) => dispatch(loadRom(pointer))
});

export default connect(mapStateToProps, mapDispatchToProps)(RomLoader);