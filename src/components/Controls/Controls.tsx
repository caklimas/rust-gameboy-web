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
const handleKeys = ['up', 'down', 'left', 'right'];

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
                handleKeys={handleKeys}
                handleEventType='keydown'
                onKeyEvent={(key: string, e: any) => {
                    const p: keyof ControlState = (`${key}Pressed` as any);
                    if (state[p])
                        return;

                    setState({ ...state, [p]: true });
                    console.log(`do something upon keydown event of ${key}`);
                }} 
            />
            <KeyboardEventHandler
                handleKeys={handleKeys}
                handleEventType='keyup'
                onKeyEvent={(key: any, e: any) => {
                    let p: keyof ControlState = (`${key}Pressed` as any);
                    if (!state[p])
                        return;

                        setState({ ...state, [p]: false });
                    console.log(`do something upon keyup event of ${key}`);
                }} 
            />
        </div>
    );
};

export default Controls;