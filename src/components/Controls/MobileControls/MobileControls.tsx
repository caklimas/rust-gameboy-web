// @ts-ignore
import ReactNipple from 'react-nipple';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AbButtons from '../AbButtons/AbButtons';
import { getDirectionFromAngle } from '../../../helpers/direction';
import { setDirection, clearDirection } from '../../../redux/actions/direction';
import { defaultState as defaultDirectionState, DirectionState } from '../../../redux/state/direction';
import { State } from '../../../redux/state/state';
import { ButtonState } from '../../../redux/state/buttons';
import { RustGameboy } from '../../../redux/state/rustGameboy';
import { getInput } from '../../../helpers/input';
import StartSelectButtons from '../StartSelectButtons/StartSelectButtons';

type Props = StateProps & DispatchProps;

interface StateProps {
    buttons: ButtonState,
    pointer: number,
    rustGameboy: RustGameboy
}

interface DispatchProps {
    setDirection(direction: DirectionState): any;
    clearDirection(): void;
}

const StyledControls = styled(ReactNipple)`
    display: inline-block;
    position: relative;
`;

const MobileControls = (props: Props) => (
    <div>
        <StyledControls
            options={{ mode: 'static', position: { top: '50%', left: '50%' } }}
            style={{
                width: 150,
                height: 150
            }}
            onMove={(_evt: any, data: any) => onMove(props, data.angle.degree)}
            onEnd={() => onEnd(props)}
        />
        <AbButtons />
        <StartSelectButtons />
    </div>
);

const onMove = (props: Props, angle: number) => {
    const direction = getDirectionFromAngle(angle);
    const input = getInput(props.rustGameboy, props.buttons, direction);
    props.rustGameboy.update_controls(props.pointer, input);
    props.setDirection(direction);
};

const onEnd = (props: Props) => {
    const input = getInput(props.rustGameboy, props.buttons, defaultDirectionState);
    props.rustGameboy.update_controls(props.pointer, input);
    props.clearDirection();
};

const mapStateToProps = (state: State): StateProps=> ({
    buttons: state.buttons,
    pointer: state.gameboy.pointer,
    rustGameboy: state.rustGameboy
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    setDirection: (direction: DirectionState) => dispatch(setDirection(direction)),
    clearDirection: () => dispatch(clearDirection())
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileControls);
