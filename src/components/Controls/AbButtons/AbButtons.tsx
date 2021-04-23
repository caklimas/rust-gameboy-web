import { connect } from 'react-redux';
import styled from 'styled-components';
import { getInput } from '../../../helpers/input';
import { State } from '../../../redux/state/state';
import { ButtonState } from '../../../redux/state/buttons';
import { setButtons } from '../../../redux/actions/buttons';
import { DirectionState } from '../../../redux/state/direction';
import { RustGameboy } from '../../../redux/state/rustGameboy';
import ControlButton from '../ControlButton/ControlButton';
import { mediaMinMd } from '../../../constants/screenSizes';

type Props = StateProps & DispatchProps;

interface StateProps {
    buttons: ButtonState,
    direction: DirectionState,
    pointer: number,
    rustGameboy: RustGameboy
}

interface DispatchProps {
    setButtons(buttons: ButtonState): void;
}

type ButtonKey = 'a' | 'b';

const StyledAbControls = styled.div`
    bottom: 90px;
    display: inline-grid;
    grid-template-columns: repeat(2, 50px);
    left: 75px;
    position: relative;

    @media only screen and (min-width: ${mediaMinMd}px) {
        bottom: 0;
        position: static;
        left: 0;
    }
`;

const StyledAControls = styled.div`
    grid-column: 2;
    grid-row: 1;
`;

const StyledBControls = styled.div`
    grid-column: 1;
    grid-row: 2;
`;

const AbButtons = (props: Props) => {
    return (
        <StyledAbControls>
            <StyledAControls>
                <ControlButton 
                    pressed={props.buttons.a}
                    text='A'
                    type='circle'
                    onTouchStart={e => handleTouch(e, props, 'a', true)}
                    onTouchEnd={e => handleTouch(e, props, 'a', false)}
                    onTouchCancel={e => handleTouch(e, props, 'a', false)}
                />
            </StyledAControls>
            <StyledBControls>
                <ControlButton
                    pressed={props.buttons.b} 
                    text='B' 
                    type='circle'
                    onTouchStart={e => handleTouch(e, props, 'b', true)}
                    onTouchEnd={e => handleTouch(e, props, 'b', false)}
                    onTouchCancel={e => handleTouch(e, props, 'b', false)}
                />
            </StyledBControls>
        </StyledAbControls>
    );
};

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

const mapStateToProps = (state: State): StateProps => {
    return {
        buttons: state.buttons,
        direction: state.direction,
        pointer: state.gameboy.pointer,
        rustGameboy: state.rustGameboy
    };
}; 

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    setButtons: (buttons: ButtonState) => dispatch(setButtons(buttons))
});

export default connect(mapStateToProps, mapDispatchToProps)(AbButtons);