import React from 'react';
import Button from 'react-bootstrap/Button';
import './ControlButton.css';

export interface ControlButtonProps {
    pressed: boolean;
    text: string;
    type?: 'circle' | 'square';
}

const ControlButton = (props: ControlButtonProps) => (
    <Button className={getButtonClass(props.type)} variant={getVariant(props.pressed)}>
        {props.text}
    </Button>
);

const getButtonClass = (type: 'circle' | 'square') => (
    type === 'circle' ? 'gameboy-controls-button-circle' : 'gameboy-controls-button-square'
)

const getVariant = (pressed: boolean): string => (
    pressed ? 'primary' : 'secondary'   
)

export default ControlButton;