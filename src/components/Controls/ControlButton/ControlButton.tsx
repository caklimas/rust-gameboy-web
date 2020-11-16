import React from 'react';
import Button from 'react-bootstrap/Button';
import './ControlButton.css';

export interface ControlButtonProps {
    pressed: boolean;
    text: string;
}

const ControlButton = (props: ControlButtonProps) => (
    <Button className='gameboy-controls-button' variant={getVariant(props.pressed)}>
        {props.text}
    </Button>
);

const getVariant = (pressed: boolean): string => (
    pressed ? 'primary' : 'secondary'   
)

export default ControlButton;