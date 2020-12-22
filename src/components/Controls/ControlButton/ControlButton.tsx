import React, { useState } from 'react';
// import { connect } from 'react-redux';
import cs from 'classnames';
import Button from 'react-bootstrap/Button';
// import { State } from '../../../redux/state/state';
import './ControlButton.scss';

export type ButtonType = 'circle' | 'directional' | 'start-select';

export interface ControlButtonProps {
    pressed: boolean;
    text: string;
    type: ButtonType;
}

interface ControlButtonState {
    pressed: boolean
}

const ControlButton = (props: ControlButtonProps) => {
    const [state, setState] = useState<ControlButtonState>({ pressed: false });
    return (
        <Button
            className={cs(getButtonClass(props.type, state), 'gameboy-controls-button')} 
            variant={getVariant(props.pressed || state.pressed)}
            onTouchStart={e => handleTouch(e, true, setState)}
            onTouchEnd={e => handleTouch(e, false, setState)}
            onTouchCancel={e => handleTouch(e, false, setState)}
        >
            {props.text}
        </Button>
    );
};

const getButtonClass = (type: ButtonType, state: ControlButtonState): string => {
    switch (type) {
        case "circle":
            return "gameboy-controls-button-circle";
        case "directional":
            return "gameboy-controls-button-directional";
        case "start-select":
            return "gameboy-controls-button-start-select";
        default:
            throw new Error(`Invalid button type ${type}`);
    };
};

const getVariant = (pressed: boolean): string => (
    pressed ? 'primary' : 'secondary'   
);

const handleTouch = (e: React.TouchEvent<HTMLElement>, pressed: boolean, setState: React.Dispatch<React.SetStateAction<ControlButtonState>>) => {
    e.preventDefault();
    setState({ pressed });
};

// const mapStateToProps = (state: State) => {
//     return {
//         direction: state.direction
//     };
// };

export default ControlButton;