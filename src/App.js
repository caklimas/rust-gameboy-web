import React from 'react';
import Dropzone from 'react-dropzone';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  async componentDidMount() {
    await this.loadWasm();
  }

  constructor(props) {
    super();
    this.loadFileBytes = this.loadFileBytes.bind(this);
  }

  render() {
    return (
      <div className="App">
        <Dropzone onDrop={this.loadFileBytes}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
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
        console.log(gb);
        console.log(this.state.wasm.get_gameboy(gb));
      };

      reader.readAsArrayBuffer(file);
    });
  };

  async loadWasm() {
    try {
      const wasm = await import("caklimas-rust-gameboy");
      this.setState({ wasm });
    } catch (err) {
      console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
    }
  };
}

export default App;
