import React from 'react';
import cs from 'classnames';
import Button from 'react-bootstrap/Button';
import './ControlButton.scss';

export type ButtonType = 'circle' | 'directional' | 'start-select';

export interface ControlButtonProps {
    pressed: boolean;
    text: string;
    type: ButtonType;
}

const ControlButton = (props: ControlButtonProps) => (
    <Button
        className={cs(getButtonClass(props.type), 'gameboy-controls-button')} 
        variant={getVariant(props.pressed)}
    >
        {props.text}
    </Button>
);

const getButtonClass = (type: ButtonType = "start-select"): string => {
    switch (type) {
        case "circle":
            return "gameboy-controls-button gameboy-controls-button-circle";
        case "directional":
            return "gameboy-controls-button-directional";
        case "start-select":
            return "gameboy-controls-button-start-select";
        default:
            throw new Error(`Invalid button type ${type}`);
    };
}

const getVariant = (pressed: boolean): string => (
    pressed ? 'primary' : 'secondary'   
)

export default ControlButton;