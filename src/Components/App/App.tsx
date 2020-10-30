import React from 'react';
import Dropzone from 'react-dropzone';
import './App.css';
import Canvas from '../Canvas/Canvas';
import { RustGameboy , loadWasm } from '../../Helpers/wasm';

const pixel_size = 1;
const gameboy_width = 160 * pixel_size;
const gameboy_height = 144 * pixel_size;

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

    constructor(props: any) {
        super(props);
        this.loadFileBytes = this.loadFileBytes.bind(this);
        this.state = {
            gameboy_pointer: null,
            wasm: null
        };
    }

    render() {
        return (
        <div className="App">
            <Dropzone onDrop={this.loadFileBytes}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drop Gameboy ROM to play!</p>
                </div>
                </section>
            )}
            </Dropzone>
            <Canvas width={gameboy_width} height={gameboy_height} gameboy_pointer={this.state.gameboy_pointer}></Canvas>
        </div>
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
