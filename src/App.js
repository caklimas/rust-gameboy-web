import React from 'react';
import Dropzone from 'react-dropzone';
import './App.css';

class App extends React.Component {
  async componentDidMount() {
    await this.loadWasm();
  }

  constructor(props) {
    super();
    this.loadFileBytes = this.loadFileBytes.bind(this);
    this.log_number = this.log_number.bind(this);
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
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <button disabled={!this.state.gb} onClick={this.log_number}>Get Number</button>
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
        this.setState({ gb }, () => alert("Loaded file"));
      };

      reader.readAsArrayBuffer(file);
    });
  };

  log_number() {
    if (this.state.gb) {
      const screen = this.state.wasm.clock_frame(this.state.gb);
      console.log(screen.length);
    } else {
      alert("No file loaded");
    }
  }

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
