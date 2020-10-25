import React from 'react';
import chunk from 'chunk';
import './Canvas.css';
import loadWasm from '../../Helpers/wasm';

class Canvas extends React.Component {
    async componentDidMount() {
        const wasm = await loadWasm();
        this.setState({
          wasm
        }, () => console.log('Loaded WASM'));
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.gb && !!this.props.gb) {
            console.log('Loaded ROM');
            this.interval_id = window.setInterval(() => window.requestAnimationFrame(this.updateCanvas), 16);
        }
    }

    componentWillUnmount() {
        if (this.interval_id)
            window.clearInterval(this.interval_id);
    }

    constructor(props) {
        super(props);

        this.canvas = null;
        this.interval_id = null;
        this.setCanvasRef = this.setCanvasRef.bind(this);
        this.updateCanvas = this.updateCanvas.bind(this);
    }

    render() {
        return (
            <canvas className="gameboy" ref={this.setCanvasRef} width={this.props.width} height={this.props.height}></canvas>
        );
    }

    setCanvasRef(element) {
        if (!element)
            return;
        this.canvas = element;
    }

    updateCanvas() {
        if (!this.canvas || !this.props.gb)
            return;

        const frame = this.state.wasm.clock_frame(this.props.gb);
        const chunked = chunk(frame, 3);
        const ctx = this.canvas.getContext('2d');
        const imageData = ctx.createImageData(this.props.width, this.props.height);
        const data = imageData.data;
        let dataIndex = 0;
        for (let i = 0; i < chunked.length; i++)
        {
            let rgb = chunked[i];
            for (let j = 0; j < rgb.length; j++) {
                data[dataIndex] = rgb[j];
                dataIndex++;
            }

            data[dataIndex] = 255;
            dataIndex++;
        }
        ctx.putImageData(imageData, 0, 0);
    }
}

export default Canvas;