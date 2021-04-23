import { connect } from 'react-redux';
import cs from 'classnames';
// @ts-ignore
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { getInput } from '../../../helpers/input';
import { State } from '../../../redux/state/state';
import { ButtonState } from '../../../redux/state/buttons';
import { DirectionState } from '../../../redux/state/direction';
import { setButtons } from '../../../redux/actions/buttons';
import { setDirection } from '../../../redux/actions/direction';
import { RustGameboy } from '../../../redux/state/rustGameboy';
import AbButtons from '../AbButtons/AbButtons';
import ControlButton from '../ControlButton/ControlButton';
import StartSelectButtons from '../StartSelectButtons/StartSelectButtons';

const handleKeys = ['up', 'down', 'left', 'right', 'z', 'x', 'shift', 'enter'];
const keyMapping = new Map();
keyMapping.set('x', 'a');
keyMapping.set('z', 'b');
keyMapping.set('enter', 'start');
keyMapping.set('shift', 'select');

type Props = OwnProps & StateProps & DispatchProps;

interface OwnProps {
    className?: string;
}

interface StateProps {
    buttons: ButtonState,
    direction: DirectionState,
    pointer: number,
    rustGameboy: RustGameboy
}

interface DispatchProps {
    setButtons(buttons: ButtonState): void;
    setDirection(direction: DirectionState): void;
}

const DesktopControls = (props: Props) => (
    <div className={cs(props.className, 'gameboy-controls')}>
        {renderUpperControls(props.direction)}
        <StartSelectButtons />
        {renderKeyboardHandlers(props)}
    </div>
);

const renderUpperControls = (directionState: DirectionState) => {
    return (
        <>
            <div className='gameboy-directional-controls'>
                <div className='gameboy-controls-up'>
                    <ControlButton pressed={directionState.up} text='↑' type='directional' />
                </div>
                <div className='gameboy-controls-down'>
                    <ControlButton pressed={directionState.down} text='↓' type='directional' />
                </div>
                <div className='gameboy-controls-left'>
                    <ControlButton pressed={directionState.left} text='←' type='directional' />
                </div>
                <div className='gameboy-controls-right'>
                    <ControlButton pressed={directionState.right} text='→' type='directional' />
                </div>
            </div>
            <AbButtons />
        </>
    );
};

const renderKeyboardHandlers = (props: Props) => {
    return (
        <>
            <KeyboardEventHandler
                handleKeys={handleKeys}
                handleEventType='keydown'
                onKeyEvent={(key: string, _e: any) => {
                    if (keyMapping.has(key)) {
                        let p: keyof ButtonState = (keyMapping.get(key) as any);
                        if (props.buttons[p])
                            return;
                        
                        const updatedButtons = { ...props.buttons, [p]: true };
                        const input = getInput(props.rustGameboy, updatedButtons, props.direction);
                        props.setButtons(updatedButtons);
                        props.rustGameboy.update_controls(props.pointer, input);
                    } else {
                        const p: keyof DirectionState = (key as any);
                        if (props.direction[p])
                            return;

                        const updatedDirection = { ...props.direction, [p]: true };
                        const input = getInput(props.rustGameboy, props.buttons, updatedDirection);
                        props.setDirection(updatedDirection);
                        props.rustGameboy.update_controls(props.pointer, input);
                    }
                }} 
            />
            <KeyboardEventHandler
                handleKeys={handleKeys}
                handleEventType='keyup'
                onKeyEvent={(key: any, _e: any) => {
                    if (keyMapping.has(key)) {
                        let p: keyof ButtonState = (keyMapping.get(key) as any);
                        if (!props.buttons[p])
                            return;
                        
                        const updatedButtons = { ...props.buttons, [p]: false };
                        const input = getInput(props.rustGameboy, updatedButtons, props.direction);
                        props.setButtons(updatedButtons);
                        props.rustGameboy.update_controls(props.pointer, input);
                    } else {
                        let p: keyof DirectionState = (key as any);
                        if (!props.direction[p])
                            return;

                        const updatedDirection = { ...props.direction, [p]: false };
                        const input = getInput(props.rustGameboy, props.buttons, updatedDirection);
                        props.setDirection(updatedDirection);
                        props.rustGameboy.update_controls(props.pointer, input);
                    }
                }} 
            />
        </>
    );
};

const mapStateToProps = (state: State): StateProps => ({
    buttons: state.buttons,
    direction: state.direction,
    pointer: state.gameboy.pointer,
    rustGameboy: state.rustGameboy
}); 

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    setButtons: (buttons: ButtonState) => dispatch(setButtons(buttons)),
    setDirection: (direction: DirectionState) => dispatch(setDirection(direction))
});

export default connect(mapStateToProps, mapDispatchToProps)(DesktopControls);