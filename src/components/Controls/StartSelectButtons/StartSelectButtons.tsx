import { connect } from 'react-redux';
import styled from 'styled-components';
import ControlButton from "../ControlButton/ControlButton";
import { ButtonState } from '../../../redux/state/buttons';
import { State } from '../../../redux/state/state';
import { getInput } from '../../../helpers/input';
import { RustGameboy } from '../../../redux/state/rustGameboy';
import { setButtons } from '../../../redux/actions/buttons';
import { DirectionState } from '../../../redux/state/direction';
import { mediaMinMd } from '../../../constants/screenSizes';

type Props = StateProps & DispatchProps;

interface StateProps {
    buttons: ButtonState;
    direction: DirectionState,
    pointer: number;
    rustGameboy: RustGameboy;
}

interface DispatchProps {
    setButtons(buttons: ButtonState): void;
}

type ButtonKey = 'start' | 'select';

const StyledStartSelectControls = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, 75px);
    justify-content: center;
    margin-top: -55px;

    @media only screen and (min-width: ${mediaMinMd}px) {
        margin-top: 35px;
    }
`;

const StyledStartControls = styled.div`
    grid-column: 1;
    grid-row: 1;
`;

const StyledSelectControls = styled.div`
    grid-column: 2;
    grid-row: 1;
`;

const StartSelectButtons = (props: Props) => {
    return (
        <StyledStartSelectControls>
            <StyledStartControls className='gameboy-controls-start'>
                <ControlButton
                    pressed={props.buttons.start}
                    text='Start'
                    type='start-select'
                    onTouchStart={e => handleTouch(e, props, 'start', true)}
                    onTouchEnd={e => handleTouch(e, props, 'start', false)}
                    onTouchCancel={e => handleTouch(e, props, 'start', false)}
                />
            </StyledStartControls>
            <StyledSelectControls className='gameboy-controls-select'>
                <ControlButton
                    pressed={props.buttons.select}
                    text='Select'
                    type='start-select'
                    onTouchStart={e => handleTouch(e, props, 'select', true)}
                    onTouchEnd={e => handleTouch(e, props, 'select', false)}
                    onTouchCancel={e => handleTouch(e, props, 'select', false)}
                />
            </StyledSelectControls>
        </StyledStartSelectControls>
    );
}

const handleTouch = (e: React.TouchEvent<HTMLElement>, props: Props, buttonKey: ButtonKey, pressed: boolean) => {
    e.preventDefault();

    const updatedState = { ...props.buttons, [buttonKey]: pressed };
    const input = getInput(props.rustGameboy, updatedState, props.direction);
    props.setButtons(updatedState);
    props.rustGameboy.update_controls(props.pointer, input);

    if (pressed) {
        window.navigator.vibrate(10);
    }
};

const mapStateToProps = (state: State): StateProps => ({
    buttons: state.buttons,
    direction: state.direction,
    pointer: state.gameboy.pointer,
    rustGameboy: state.rustGameboy
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    setButtons: (buttons: ButtonState) => dispatch(setButtons(buttons))
});

export default connect(mapStateToProps, mapDispatchToProps)(StartSelectButtons);
