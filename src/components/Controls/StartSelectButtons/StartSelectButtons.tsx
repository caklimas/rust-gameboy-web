import { connect } from 'react-redux';
import './StartSelectButtons.scss';
import ControlButton from "../ControlButton/ControlButton";
import { ButtonState } from '../../../redux/state/buttons';
import { State } from '../../../redux/state/state';
import { getInput } from '../../../helpers/input';
import { RustGameboy } from '../../../redux/state/rustGameboy';
import { setButtons } from '../../../redux/actions/buttons';
import { DirectionState } from '../../../redux/state/direction';

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

const StartSelectButtons = (props: Props) => {
    return (
        <div className='gameboy-start-select-controls'>
            <div className='gameboy-controls-start'>
                <ControlButton
                    pressed={props.buttons.start}
                    text='Start'
                    type='start-select'
                    onTouchStart={e => handleTouch(e, props, 'start', true)}
                    onTouchEnd={e => handleTouch(e, props, 'start', false)}
                    onTouchCancel={e => handleTouch(e, props, 'start', false)}
                />
            </div>
            <div className='gameboy-controls-select'>
                <ControlButton
                    pressed={props.buttons.select}
                    text='Select'
                    type='start-select'
                    onTouchStart={e => handleTouch(e, props, 'select', true)}
                    onTouchEnd={e => handleTouch(e, props, 'select', false)}
                    onTouchCancel={e => handleTouch(e, props, 'select', false)}
                />
            </div>
        </div>
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
