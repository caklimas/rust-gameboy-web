import React from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import './Gameboy.scss';
import gameboyDimensions from '../../constants/gameboy';
import { mobileMediaQuery } from '../../helpers/mediaQueries';
import { State } from '../../redux/state/state';
import Screen from '../Screen/Screen';
import Controls from '../Controls/Controls';

export interface GameboyProps {
    pointer: number
};

const Gameboy = (props: GameboyProps) => {
    const isMobile = useMediaQuery(mobileMediaQuery);
    const pixelSize = isMobile ? 1 : 3;
    if (!props.pointer)
        return null;

    return (
        <div className='gameboy'>
            <Screen
                className='gameboy-item'
                width={gameboyDimensions.width}
                height={gameboyDimensions.height}
                pixelSize={pixelSize}
                gameboy_pointer={props.pointer}
            />
            <Controls className='gameboy-item' />
        </div>
    );
};

const mapStateToProps = (state: State) => {
    return {
        pointer: state.gameboy.pointer
    };
};

export default connect(mapStateToProps)(Gameboy);