import React, { useState } from 'react';
import cs from 'classnames';
import './Controls.css';
import ControlButton from './ControlButton/ControlButton';

export interface ControlsProps {
    className?: string
}

export interface ControlsState {
    upPressed: boolean,
    downPressed: boolean,
    leftPressed: boolean,
    rightPressed: boolean,
    xPressed: boolean,
    zPressed: boolean,
    shiftPressed: boolean,
    enterPressed: boolean
};

const KeyboardEventHandler = require('react-keyboard-event-handler');
const handleKeys = ['up', 'down', 'left', 'right', 'z', 'x', 'shift', 'enter'];

const Controls = (props: ControlsProps) => {
    const [state, setState] = useState<ControlsState>({
        upPressed: false,
        downPressed: false,
        leftPressed: false,
        rightPressed: false,
        xPressed: false,
        zPressed: false,
        shiftPressed: false,
        enterPressed: false
    });

    return (
        <div className={cs(props.className, 'gameboy-controls')}>
            {renderUpperControls(state)}
            {renderLowerControls(state)}
            {renderKeyboardHandlers(state, setState)}
        </div>
    );
};

const renderUpperControls = (state: ControlsState) => {
    return (
        <div>
            <div className='gameboy-directional-controls'>
                <div className='gameboy-controls-up'>
                    <ControlButton pressed={state.upPressed} text='↑' type='directional' />
                </div>
                <div className='gameboy-controls-down'>
                    <ControlButton pressed={state.downPressed} text='↓' type='directional' />
                </div>
                <div className='gameboy-controls-left'>
                    <ControlButton pressed={state.leftPressed} text='←' type='directional' />
                </div>
                <div className='gameboy-controls-right'>
                    <ControlButton pressed={state.rightPressed} text='→' type='directional' />
                </div>
            </div>
            <div className='gameboy-a-b-controls'>
                <div className='gameboy-controls-a'>
                    <ControlButton pressed={state.xPressed} text='A' type='circle' />
                </div>
                <div className='gameboy-controls-b'>
                    <ControlButton pressed={state.zPressed} text='B' type='circle' />
                </div>
            </div>
        </div>
    );
};

const renderLowerControls = (state: ControlsState) => {
    return (
        <div>
            <div className='gameboy-start-select-controls'>
                <div className='gameboy-controls-start'>
                    <ControlButton pressed={state.shiftPressed} text='Start' type='start-select' />
                </div>
                <div className='gameboy-controls-select'>
                    <ControlButton pressed={state.enterPressed} text='Select' type='start-select' />
                </div>
            </div>
        </div>
    );
};

const renderKeyboardHandlers = (state: ControlsState, setState: React.Dispatch<React.SetStateAction<ControlsState>>) => {
    return (
        <>
            <KeyboardEventHandler
                handleKeys={handleKeys}
                handleEventType='keydown'
                onKeyEvent={(key: string, e: any) => {
                    const p: keyof ControlsState = (`${key}Pressed` as any);
                    if (state[p])
                        return;

                    setState({ ...state, [p]: true });
                }} 
            />
            <KeyboardEventHandler
                handleKeys={handleKeys}
                handleEventType='keyup'
                onKeyEvent={(key: any, e: any) => {
                    let p: keyof ControlsState = (`${key}Pressed` as any);
                    if (!state[p])
                        return;

                        setState({ ...state, [p]: false });
                }} 
            />
        </>
    );
};

export default Controls;