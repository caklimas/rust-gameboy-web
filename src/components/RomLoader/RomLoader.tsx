import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

import './RomLoader.css';
import { loadRom } from '../../redux/actions/gameboy';
import { RustGameboy , loadWasm } from '../../helpers/wasm';
import { State } from '../../redux/state/state';

export type RomLoaderProps = RomLoaderStateProps & RomLoaderDispatchProps;
export interface RomLoaderStateProps {
    pointer: number;
}

export interface RomLoaderDispatchProps {
    loadRom: (pointer: number) => any;
}

const RomLoader = (props: RomLoaderProps) => {
    const [gameboy, setGameboy] = useState<RustGameboy>(null);
    const loadFileBytes = <T extends File>(acceptedFiles: T[]) => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onabort = () => console.log("File was aborted");
            reader.onerror = () => console.log("Error reading the file");
            reader.onload = () => {
                const buffer = reader.result;
                var array = new Uint8Array(buffer as any);
                let gb = gameboy.run(array);
                props.loadRom(gb);
            };
    
            reader.readAsArrayBuffer(file);
        });
    };

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
        <Dropzone onDrop={loadFileBytes}>
            {({getRootProps, getInputProps}) => (
                <div className='rom-loader-dropzone' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drop Gameboy ROM to play!</p>
                </div>
            )}
        </Dropzone>
    );
}

const mapStateToProps = (state: State) => {
    return {
        pointer: state.gameboy.pointer
    };
}; 

const mapDispatchToProps = (dispatch: any) => ({
    loadRom: (pointer: number) => dispatch(loadRom(pointer))
});

export default connect(mapStateToProps, mapDispatchToProps)(RomLoader);