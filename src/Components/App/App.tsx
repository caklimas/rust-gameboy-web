import React from 'react';

import './App.css';
import Gameboy from '../Gameboy/Gameboy';
import RomLoader from '../RomLoader/RomLoader';
import { RustGameboy , loadWasm } from '../../helpers/wasm';

interface AppState {
  gameboy_pointer: number,
  wasm: RustGameboy
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
    }

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
