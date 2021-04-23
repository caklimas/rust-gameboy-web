import { connect } from 'react-redux';
import { ButtonState } from '../../../redux/state/buttons';
import { State } from '../../../redux/state/state';
import ControlButton from "../ControlButton/ControlButton";

interface StateProps {
    buttons: ButtonState;
}

const StartSelectButtons = ({
    buttons
}: StateProps) => {
    return (
        <div className='gameboy-start-select-controls'>
            <div className='gameboy-controls-start'>
                <ControlButton pressed={buttons.start} text='Start' type='start-select' />
            </div>
            <div className='gameboy-controls-select'>
                <ControlButton pressed={buttons.select} text='Select' type='start-select' />
            </div>
        </div>
    );
}

const mapStateToProps = (state: State): StateProps => ({
    buttons: state.buttons
}); 

export default connect(mapStateToProps)(StartSelectButtons);
