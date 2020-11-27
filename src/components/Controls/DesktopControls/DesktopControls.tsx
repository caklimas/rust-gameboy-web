import React from 'react';
import { connect } from 'react-redux';
import cs from 'classnames';
import { State } from '../../../redux/state/state';
import { DirectionState } from '../../../redux/state/direction';
import { setDirection } from '../../../redux/actions/direction';
import AbButtons from '../AbButtons/AbButtons';
import ControlButton from '../ControlButton/ControlButton';
// @ts-ignore
import KeyboardEventHandler from 'react-keyboard-event-handler';

const handleKeys = ['up', 'down', 'left', 'right', 'z', 'x', 'shift', 'enter'];

export type DesktopControlsProps = DesktopControlsOwnProps & DesktopControlsStateProps & DesktopControlsDispatchProps;

export interface DesktopControlsOwnProps {
    className?: string;
}

export interface DesktopControlsStateProps {
    direction: DirectionState
}

export interface DesktopControlsDispatchProps {
    setDirection(direction: DirectionState): void;
}

const DesktopControls = (props: DesktopControlsProps) => (
    <div className={cs(props.className, 'gameboy-controls')}>
        {renderUpperControls(props.direction)}
        {renderLowerControls()}
        {renderKeyboardHandlers(props)}
    </div>
);

const renderUpperControls = (state: DirectionState) => {
    return (
        <div>
            <div className='gameboy-directional-controls'>
                <div className='gameboy-controls-up'>
                    <ControlButton pressed={state.up} text='↑' type='directional' />
                </div>
                <div className='gameboy-controls-down'>
                    <ControlButton pressed={state.down} text='↓' type='directional' />
                </div>
                <div className='gameboy-controls-left'>
                    <ControlButton pressed={state.left} text='←' type='directional' />
                </div>
                <div className='gameboy-controls-right'>
                    <ControlButton pressed={state.right} text='→' type='directional' />
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
                onKeyEvent={(key: string, e: any) => {
                    const p: keyof DirectionState = (key as any);
                    if (props.direction[p])
                        return;

                    const updatedDirection = { ...props.direction, [p]: true };
                    props.setDirection(updatedDirection);
                }} 
            />
            <KeyboardEventHandler
                handleKeys={handleKeys}
                handleEventType='keyup'
                onKeyEvent={(key: any, e: any) => {
                    let p: keyof DirectionState = (key as any);
                    if (!props.direction[p])
                        return;

                    const updatedDirection = { ...props.direction, [p]: false };
                    props.setDirection(updatedDirection);
                }} 
            />
        </>
    );
};

const mapStateToProps = (state: State) => {
    return {
        direction: state.direction
    };
}; 

const mapDispatchToProps = (dispatch: any) => ({
    setDirection: (direction: DirectionState) => dispatch(setDirection(direction))
});

export default connect(mapStateToProps, mapDispatchToProps)(DesktopControls);