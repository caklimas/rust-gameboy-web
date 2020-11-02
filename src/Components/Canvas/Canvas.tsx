import React from 'react';
import chunk from 'chunk';
import './Canvas.css';
import { RustGameboy, loadWasm } from '../../Helpers/wasm';

interface CanvasProps {
    gameboy_pointer: number,
    width: number,
    height: number
}

interface CanvasState {
    wasm: RustGameboy
}

class Canvas extends React.Component<CanvasProps, CanvasState> {
    private canvas: any;
    private interval_id: number;

    async componentDidMount() {
        const wasm = await loadWasm();
        this.setState({
          wasm
        }, () => console.log('Loaded WASM'));
    }

    componentDidUpdate(prevProps: CanvasProps) {
        if (!!this.props.gameboy_pointer) {
            console.log('Loaded ROM');
            this.interval_id = window.setInterval(() => window.requestAnimationFrame(this.updateCanvas), 16);
        }
    }

    componentWillUnmount() {
        if (this.interval_id)
            window.clearInterval(this.interval_id);
    }

    constructor(props: CanvasProps) {
        super(props);

        this.canvas = null;
        this.interval_id = 0;
        this.setCanvasRef = this.setCanvasRef.bind(this);
        this.updateCanvas = this.updateCanvas.bind(this);
    }

    render() {
        return (
            <canvas
                className="gameboy"
                ref={this.setCanvasRef}
                width={this.props.width}
                height={this.props.height} 
            />
        );
    }

    setCanvasRef(element: any) {
        if (!element)
            return;
        this.canvas = element;
    }

    updateCanvas() {
        if (!this.canvas || !this.props.gameboy_pointer)
            return;

        const frame = this.state.wasm.clock_frame(this.props.gameboy_pointer);
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