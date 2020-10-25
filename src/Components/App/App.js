import React from 'react';
import Dropzone from 'react-dropzone';
import './App.css';
import Canvas from '../Canvas/Canvas';
import loadWasm from '../../Helpers/wasm';

const pixel_size = 1;
const gameboy_width = 160 * pixel_size;
const gameboy_height = 144 * pixel_size;

class App extends React.Component {
  async componentDidMount() {
    const wasm = await loadWasm();
    this.setState({
      wasm
    });
  }

  constructor(props) {
    super();
    this.loadFileBytes = this.loadFileBytes.bind(this);
    this.state = {
      gb: null
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
        <Canvas width={gameboy_width} height={gameboy_height} gb={this.state.gb}></Canvas>
      </div>
    );
  }

  loadFileBytes(acceptedFiles) {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onabort = () => console.log("File was aborted");
      reader.onerror = () => console.log("Error reading the file");
      reader.onload = () => {
        const buffer = reader.result;
        var array = new Uint8Array(buffer);
        let gb = this.state.wasm.run(array);
        this.setState({ gb });
      };

      reader.readAsArrayBuffer(file);
    });
  };
}

export default App;
