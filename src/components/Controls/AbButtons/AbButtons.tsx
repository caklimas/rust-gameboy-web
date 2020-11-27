import React from 'react';
import ControlButton from '../ControlButton/ControlButton';
import './AbButtons.scss';

const AbButtons = () => (
    <div className='gameboy-a-b-controls'>
        <div className='gameboy-controls-a'>
            <ControlButton pressed={false} text='A' type='circle' />
        </div>
        <div className='gameboy-controls-b'>
            <ControlButton pressed={false} text='B' type='circle' />
        </div>
    </div>
);

export default AbButtons;