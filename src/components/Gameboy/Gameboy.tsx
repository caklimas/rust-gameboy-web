import React from 'react';
import { connect } from 'react-redux';

import './Gameboy.css';
import gameboyDimensions from '../../constants/gameboy';
import { State } from '../../redux/state/state';
import Screen from '../Screen/Screen';
import Controls from '../Controls/Controls';

export interface GameboyProps {
    pointer: number
}

const Gameboy = (props: GameboyProps) => {
    if (!props.pointer)
        return null

    return (
        <div className='gameboy'>
            <Screen
                className='gameboy-item'
                width={gameboyDimensions.width}
                height={gameboyDimensions.height}
                pixelSize={gameboyDimensions.pixelSize}
                gameboy_pointer={props.pointer}
            />
            <Controls />
        </div>
    );
};

const mapStateToProps = (state: State) => {
    return {
        pointer: state.gameboy.pointer
    };
};  

export default connect(mapStateToProps)(Gameboy);