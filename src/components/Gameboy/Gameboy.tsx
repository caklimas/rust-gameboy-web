import { connect } from 'react-redux';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import gameboyDimensions from '../../constants/gameboy';
import { mobileMediaQuery } from '../../helpers/mediaQueries';
import { State } from '../../redux/state/state';
import Screen from '../Screen/Screen';
import Controls from '../Controls/Controls';
import { mediaMinMd } from '../../constants/screenSizes';

interface Props {
    pointer: number
};

const StyledGameboy = styled.div`
    background-color: #bababa;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 25px;
    display: flex;
    flex-direction: column;
    height: 500px;
    margin-top: 20px;
    width: 350px;

    @media only screen and (min-width: ${mediaMinMd}px) {
        height: 700px;
        width: 540px;
    }
`;

const StyledControls = styled.div`
    margin: 20px 20px 0px;
`;

const Gameboy = (props: Props) => {
    const isMobile = useMediaQuery(mobileMediaQuery);
    const pixelSize = isMobile ? 1 : 3;
    if (!props.pointer)
        return null;

    return (
        <StyledGameboy>
            <Screen
                width={gameboyDimensions.width}
                height={gameboyDimensions.height}
                pixelSize={pixelSize}
                gameboy_pointer={props.pointer}
            />
            <StyledControls>
                <Controls />
            </StyledControls>
        </StyledGameboy>
    );
};

const mapStateToProps = (state: State) => {
    return {
        pointer: state.gameboy.pointer
    };
};

export default connect(mapStateToProps)(Gameboy);