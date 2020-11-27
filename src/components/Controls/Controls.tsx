import React from 'react';
import { useMediaQuery } from 'react-responsive';
import './Controls.scss';
import { mobileMediaQuery } from '../../helpers/mediaQueries';
import MobileControls from './MobileControls/MobileControls';
import DesktopControls from './DesktopControls/DesktopControls';

export interface ControlsProps {
    className?: string
}

export interface ControlsState {
    upPressed: boolean,
    downPressed: boolean,
    leftPressed: boolean,
    rightPressed: boolean,
    xPressed: boolean,
    zPressed: boolean,
    shiftPressed: boolean,
    enterPressed: boolean
};

const Controls = (props: ControlsProps) => {
    const isMobile = useMediaQuery(mobileMediaQuery);
    return isMobile ? (
        <MobileControls />
    ) : (
        <DesktopControls className={props.className} />
    );
};

export default Controls;