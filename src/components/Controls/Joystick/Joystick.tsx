import React from 'react';
// @ts-ignore
import ReactNipple from 'react-nipple';
import { connect } from 'react-redux';
import './Joystick.scss';
import { setDirection, clearDirection } from '../../../redux/actions/direction';

export interface JoystickProps {
    setDirection(angle: number): any;
    clearDirection(): void;
}

const Joystick = (props: JoystickProps) => (
    <ReactNipple
        options={{ mode: 'static', position: { top: '50%', left: '50%' } }}
        style={{
            width: 150,
            height: 150
        }}
        onMove={(_evt: any, data: any) => props.setDirection(data.angle.degree)}
        onEnd={() => props.clearDirection()}
    />
);

const mapDispatchToProps = (dispatch: any) => ({
    setDirection: (angle: number) => dispatch(setDirection(angle)),
    clearDirection: () => dispatch(clearDirection())
});

export default connect(null, mapDispatchToProps)(Joystick);