import React from 'react';
// @ts-ignore
import ReactNipple from 'react-nipple';
import { connect } from 'react-redux';
import './MobileControls.scss';
import { setDirectionFromAngle, clearDirection } from '../../../redux/actions/direction';
import AbButtons from '../AbButtons/AbButtons';

export interface MobileControlsProps {
    setDirectionFromAngle(angle: number): any;
    clearDirection(): void;
}

const MobileControls = (props: MobileControlsProps) => (
    <div>
        <ReactNipple
            options={{ mode: 'static', position: { top: '50%', left: '50%' } }}
            style={{
                width: 150,
                height: 150
            }}
            onMove={(_evt: any, data: any) => setDirectionFromAngle(data.angle.degree)}
            onEnd={() => props.clearDirection()}
        />
        <AbButtons />
    </div>
);

const mapDispatchToProps = (dispatch: any) => ({
    setDirectionFromAngle: (angle: number) => dispatch(setDirectionFromAngle(angle)),
    clearDirection: () => dispatch(clearDirection())
});

export default connect(null, mapDispatchToProps)(MobileControls);