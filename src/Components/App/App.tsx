import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

import './App.css';
import Gameboy from '../Gameboy/Gameboy';
import { RustGameboy , loadWasm } from '../../helpers/wasm';

interface AppState {
  gameboy_pointer: number,
  wasm: RustGameboy
}

class App extends React.Component<{}, AppState> {
    async componentDidMount() {
        const wasm = await loadWasm();
        this.setState({
            wasm
        });
    }

    constructor(props: {}) {
        super(props);
        this.loadFileBytes = this.loadFileBytes.bind(this);
        this.state = {
            gameboy_pointer: null,
            wasm: null
        };
    }

    render() {
        return (
            <div className='app'>
                { this.renderDropzone() }
                { this.renderCanvas() }
            </div>
        );
    }

    renderDropzone() {
        if (!!this.state.gameboy_pointer)
            return undefined;

        return (
            <Dropzone onDrop={this.loadFileBytes}>
                {({getRootProps, getInputProps}) => (
                    <div className='gameboy-dropzone' {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drop Gameboy ROM to play!</p>
                    </div>
                )}
            </Dropzone>
        );
    }

    renderCanvas() {
        if (!this.state.gameboy_pointer)
            return undefined;

        return (
            <Gameboy pointer={this.state.gameboy_pointer} />
        );
    }

    loadFileBytes<T extends File>(acceptedFiles: T[]) {
            acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onabort = () => console.log("File was aborted");
            reader.onerror = () => console.log("Error reading the file");
            reader.onload = () => {
                const buffer = reader.result;
                var array = new Uint8Array(buffer as any);
                let gb = this.state.wasm.run(array);
                this.setState({ gameboy_pointer: gb });
            };

            reader.readAsArrayBuffer(file);
        });
    };
}

export default App;
