import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../redux/state/state';
import { ButtonState } from '../../../redux/state/buttons';
import { setButtons } from '../../../redux/actions/buttons';

import ControlButton from '../ControlButton/ControlButton';
import './AbButtons.scss';

export type AbButtonsProps = AbButtonsStateProps & AbButtonsDispatchProps;

export interface AbButtonsStateProps {
    buttons: ButtonState
}

export interface AbButtonsDispatchProps {
    setButtons(buttons: ButtonState): void;
}

type ButtonKey = 'a' | 'b';

const AbButtons = (props: AbButtonsProps) => {
    return (
        <div className='gameboy-a-b-controls'>
            <div className='gameboy-controls-a'>
                <ControlButton 
                    pressed={props.buttons.a}
                    text='A'
                    type='circle'
                    onTouchStart={e => handleTouch(e, props, 'a', true)}
                    onTouchEnd={e => handleTouch(e, props, 'a', false)}
                    onTouchCancel={e => handleTouch(e, props, 'a', false)}
                />
            </div>
            <div className='gameboy-controls-b'>
                <ControlButton
                    pressed={props.buttons.b} 
                    text='B' 
                    type='circle'
                    onTouchStart={e => handleTouch(e, props, 'b', true)}
                    onTouchEnd={e => handleTouch(e, props, 'b', false)}
                    onTouchCancel={e => handleTouch(e, props, 'b', false)}
                />
            </div>
        </div>
    );
};

const handleTouch = (e: React.TouchEvent<HTMLElement>, props: AbButtonsProps, buttonKey: ButtonKey, pressed: boolean) => {
    e.preventDefault();

    const updatedState = { ...props.buttons, [buttonKey]: pressed };
    props.setButtons(updatedState);

    if (pressed) {
        window.navigator.vibrate(10);
    }
};

const mapStateToProps = (state: State) => {
    return {
        buttons: state.buttons
    };
}; 

const mapDispatchToProps = (dispatch: any) => ({
    setButtons: (buttons: ButtonState) => dispatch(setButtons(buttons))
});

export default connect(mapStateToProps, mapDispatchToProps)(AbButtons);