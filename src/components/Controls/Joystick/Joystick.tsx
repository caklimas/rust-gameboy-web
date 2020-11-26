import React from 'react';
// @ts-ignore
import ReactNipple from 'react-nipple';
import './Joystick.scss';
import { getDirection } from '../../../helpers/direction';

const Joystick = () => (
    <ReactNipple
        options={{ mode: 'static', position: { top: '50%', left: '50%' } }}
        style={{
            width: 150,
            height: 150
        }}
        onMove={(_evt: any, data: any) => console.log(getDirection(data.angle.degree))}
    />
);

export default Joystick;