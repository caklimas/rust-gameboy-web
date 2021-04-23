import { connect } from 'react-redux';
import { getInput } from '../../../helpers/input';
import { State } from '../../../redux/state/state';
import { ButtonState } from '../../../redux/state/buttons';
import { setButtons } from '../../../redux/actions/buttons';
import { DirectionState } from '../../../redux/state/direction';
import { RustGameboy } from '../../../redux/state/rustGameboy';
import ControlButton from '../ControlButton/ControlButton';
import './AbButtons.scss';

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

const AbButtons = (props: Props) => {
    return (
        <div className='gameboy-a-b-controls'>
            <div className='gameboy-controls-a'>
                <ControlButton 
                    pressed={props.buttons.a}
                    text='A'
                    type='circle'
                    onTouchStart={e => handleTouch(e, props, 'a', true)}
                    onTouchEnd={e => handleTouch(e, props, 'a', false)}
                    onTouchCancel={e => handleTouch(e, props, 'a', false)}
                />
            </div>
            <div className='gameboy-controls-b'>
                <ControlButton
                    pressed={props.buttons.b} 
                    text='B' 
                    type='circle'
                    onTouchStart={e => handleTouch(e, props, 'b', true)}
                    onTouchEnd={e => handleTouch(e, props, 'b', false)}
                    onTouchCancel={e => handleTouch(e, props, 'b', false)}
                />
            </div>
        </div>
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