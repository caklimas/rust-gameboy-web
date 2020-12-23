import React from 'react';
import { connect } from 'react-redux';
import cs from 'classnames';
import { State } from '../../../redux/state/state';
import { ButtonState } from '../../../redux/state/buttons';
import { DirectionState } from '../../../redux/state/direction';
import { setButtons } from '../../../redux/actions/buttons';
import { setDirection } from '../../../redux/actions/direction';
import AbButtons from '../AbButtons/AbButtons';
import ControlButton from '../ControlButton/ControlButton';
// @ts-ignore
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Button from 'react-bootstrap/esm/Button';

const aKey = 'x';
const bKey='z'
const handleKeys = ['up', 'down', 'left', 'right', 'z', 'x', 'shift', 'enter'];
const keyMapping = new Map();
keyMapping.set(aKey, 'a');
keyMapping.set(bKey, 'b');

export type DesktopControlsProps = DesktopControlsOwnProps & DesktopControlsStateProps & DesktopControlsDispatchProps;

export interface DesktopControlsOwnProps {
    className?: string;
}

export interface DesktopControlsStateProps {
    buttons: ButtonState,
    direction: DirectionState
}

export interface DesktopControlsDispatchProps {
    setButtons(buttons: ButtonState): void;
    setDirection(direction: DirectionState): void;
}

const DesktopControls = (props: DesktopControlsProps) => (
    <div className={cs(props.className, 'gameboy-controls')}>
        {renderUpperControls(props.direction, props.buttons)}
        {renderLowerControls()}
        {renderKeyboardHandlers(props)}
    </div>
);

const renderUpperControls = (directionState: DirectionState, buttonState: ButtonState) => {
    return (
        <div>
            <div className='gameboy-directional-controls'>
                <div className='gameboy-controls-up'>
                    <ControlButton pressed={directionState.up} text='↑' type='directional' />
                </div>
                <div className='gameboy-controls-down'>
                    <ControlButton pressed={directionState.down} text='↓' type='directional' />
                </div>
                <div className='gameboy-controls-left'>
                    <ControlButton pressed={directionState.left} text='←' type='directional' />
                </div>
                <div className='gameboy-controls-right'>
                    <ControlButton pressed={directionState.right} text='→' type='directional' />
                </div>
            </div>
            <AbButtons />
        </div>
    );
};

const renderLowerControls = () => {
    return (
        <div>
            <div className='gameboy-start-select-controls'>
                <div className='gameboy-controls-start'>
                    <ControlButton pressed={false} text='Start' type='start-select' />
                </div>
                <div className='gameboy-controls-select'>
                    <ControlButton pressed={false} text='Select' type='start-select' />
                </div>
            </div>
        </div>
    );
};

const renderKeyboardHandlers = (props: DesktopControlsProps) => {
    return (
        <>
            <KeyboardEventHandler
                handleKeys={handleKeys}
                handleEventType='keydown'
                onKeyEvent={(key: string, _e: any) => {
                    if (keyMapping.has(key)) {
                        let p: keyof ButtonState = (keyMapping.get(key) as any);
                        if (props.buttons[p])
                            return;
                        
                        const updatedButtons = { ...props.buttons, [p]: true };
                        props.setButtons(updatedButtons);
                    } else {
                        const p: keyof DirectionState = (key as any);
                        if (props.direction[p])
                            return;

                        const updatedDirection = { ...props.direction, [p]: true };
                        props.setDirection(updatedDirection);
                    }
                }} 
            />
            <KeyboardEventHandler
                handleKeys={handleKeys}
                handleEventType='keyup'
                onKeyEvent={(key: any, _e: any) => {
                    if (keyMapping.has(key)) {
                        let p: keyof ButtonState = (keyMapping.get(key) as any);
                        if (!props.buttons[p])
                            return;
                        
                        const updatedButtons = { ...props.buttons, [p]: false };
                        props.setButtons(updatedButtons);
                    } else {
                        let p: keyof DirectionState = (key as any);
                        if (!props.direction[p])
                            return;

                        const updatedDirection = { ...props.direction, [p]: false };
                        props.setDirection(updatedDirection);
                    }
                }} 
            />
        </>
    );
};

const mapStateToProps = (state: State) => {
    return {
        buttons: state.buttons,
        direction: state.direction
    };
}; 

const mapDispatchToProps = (dispatch: any) => ({
    setButtons: (buttons: ButtonState) => dispatch(setButtons(buttons)),
    setDirection: (direction: DirectionState) => dispatch(setDirection(direction))
});

export default connect(mapStateToProps, mapDispatchToProps)(DesktopControls);