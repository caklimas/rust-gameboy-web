import React from 'react';
import gameboyDimensions from '../../constants/gameboy';
import Canvas from '../Canvas/Canvas';

export interface GameboyProps {
    pointer: number
}

const Gameboy = (props: GameboyProps) => (
    <Canvas 
        width={gameboyDimensions.width}
        height={gameboyDimensions.height}
        pixelSize={gameboyDimensions.pixelSize}
        gameboy_pointer={props.pointer}
    />
);

export default Gameboy;