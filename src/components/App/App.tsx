import React from 'react';
import './App.css';
import Gameboy from '../Gameboy/Gameboy';
import RomLoader from '../RomLoader/RomLoader';

class App extends React.Component {
    render() {
        return (
            <div className='app'>
                <RomLoader />
                <Gameboy />
            </div>
        );
    }
}

export default App;
