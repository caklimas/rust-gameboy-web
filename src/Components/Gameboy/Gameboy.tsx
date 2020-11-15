import React from 'react';
import { connect } from 'react-redux';

import gameboyDimensions from '../../constants/gameboy';
import { State } from '../../redux/state/state';
import Canvas from '../Canvas/Canvas';

export interface GameboyProps {
    pointer: number
}

const Gameboy = (props: GameboyProps) => {
    if (!props.pointer)
        return null

    return (
        <Canvas 
            width={gameboyDimensions.width}
            height={gameboyDimensions.height}
            pixelSize={gameboyDimensions.pixelSize}
            gameboy_pointer={props.pointer}
        />
    );
};

const mapStateToProps = (state: State) => {
    return {
        pointer: state.gameboy.pointer
    };
};  

export default connect(mapStateToProps)(Gameboy);