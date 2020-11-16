import React, { useState } from 'react';
import './Controls.css';
import ControlButton from './ControlButton/ControlButton';

export interface ControlState {
    upPressed: boolean,
    downPressed: boolean,
    leftPressed: boolean,
    rightPressed: boolean
};

const KeyboardEventHandler = require('react-keyboard-event-handler');

const Controls = () => {
    const [state, setState] = useState<ControlState>({
        upPressed: false,
        downPressed: false,
        leftPressed: false,
        rightPressed: false
    });

    return (
        <div className='gameboy-controls'>
            <div className='gameboy-controls-up'>
                <ControlButton pressed={state.upPressed} text='Up' />
            </div>
            <div className='gameboy-controls-down'>
                <ControlButton pressed={state.downPressed} text='Down' />
            </div>
            <div className='gameboy-controls-left'>
                <ControlButton pressed={state.leftPressed} text='Left' />
            </div>
            <div className='gameboy-controls-right'>
                <ControlButton pressed={state.rightPressed} text='Right' />
            </div>
            <KeyboardEventHandler
                handleKeys={['up', 'down', 'left', 'right']}
                onKeyEvent={(key: any, e: any) => {
                    console.log(`do something upon keydown event of ${key}`);
                    console.log(e);
                }} 
            />
        </div>
    );
};

export default Controls;