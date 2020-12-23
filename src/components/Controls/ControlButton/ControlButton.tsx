import React from 'react';
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

    onTouchStart?: (e: React.TouchEvent<HTMLElement>) => void
    onTouchEnd?: (e: React.TouchEvent<HTMLElement>) => void
    onTouchCancel?: (e: React.TouchEvent<HTMLElement>) => void
}

const ControlButton = (props: ControlButtonProps) => {
    return (
        <Button
            className={cs(getButtonClass(props.type), 'gameboy-controls-button')} 
            variant={getVariant(props.pressed)}
            onTouchStart={props.onTouchStart}
            onTouchEnd={props.onTouchEnd}
            onTouchCancel={props.onTouchCancel}
        >
            {props.text}
        </Button>
    );
};

const getButtonClass = (type: ButtonType): string => {
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

export default ControlButton;