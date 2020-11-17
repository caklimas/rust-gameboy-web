import React, { useState } from 'react';
import './Controls.css';
import ControlButton from './ControlButton/ControlButton';

export interface ControlState {
    upPressed: boolean,
    downPressed: boolean,
    leftPressed: boolean,
    rightPressed: boolean,
    xPressed: boolean,
    zPressed: boolean,
    shiftPressed: boolean,
    altPressed: boolean
};

const KeyboardEventHandler = require('react-keyboard-event-handler');
const handleKeys = ['up', 'down', 'left', 'right', 'z', 'x', 'shift', 'alt'];

const Controls = () => {
    const [state, setState] = useState<ControlState>({
        upPressed: false,
        downPressed: false,
        leftPressed: false,
        rightPressed: false,
        xPressed: false,
        zPressed: false,
        shiftPressed: false,
        altPressed: false
    });

    return (
        <div className='gameboy-controls'>
            {renderUpperControls(state)}
            {renderLowerControls(state)}
            {renderKeyboardHandlers(state, setState)}
        </div>
    );
};

const renderUpperControls = (state: ControlState) => {
    return (
        <div>
            <div className='gameboy-directional-controls'>
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
            </div>
            <div className='gameboy-a-b-controls'>
                <div className='gameboy-controls-a'>
                    <ControlButton pressed={state.xPressed} text="A" type='circle' />
                </div>
                <div className='gameboy-controls-b'>
                    <ControlButton pressed={state.zPressed} text="B" type='circle' />
                </div>
            </div>
        </div>
    );
};

const renderLowerControls = (state: ControlState) => {
    return (
        <div>
            <div className='gameboy-start-select-controls'>
                <div className='gameboy-controls-start'>
                    <ControlButton pressed={state.shiftPressed} text="Start" />
                </div>
                <div className='gameboy-controls-select'>
                    <ControlButton pressed={state.altPressed} text="Select" />
                </div>
            </div>
        </div>
    );
};

const renderKeyboardHandlers = (state: ControlState, setState: React.Dispatch<React.SetStateAction<ControlState>>) => {
    return (
        <>
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
        </>
    );
};

export default Controls;