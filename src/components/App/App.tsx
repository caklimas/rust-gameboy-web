import React from 'react';
import styled from 'styled-components';
import Gameboy from '../Gameboy/Gameboy';
import RomLoader from '../RomLoader/RomLoader';

const StyledApp = styled.div`
    background-color: black;
    display: flex;
    justify-content: center;
    height: 100vh;
`;

class App extends React.Component {
    render() {
        return (
            <StyledApp>
                <RomLoader />
                <Gameboy />
            </StyledApp>
        );
    }
}

export default App;
