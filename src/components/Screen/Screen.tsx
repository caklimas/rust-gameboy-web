import React from 'react';
import chunk from 'chunk';
import cs from 'classnames';
import './Screen.css';
import { RustGameboy, loadWasm } from '../../helpers/wasm';

interface ScreenProps {
    className?: string,
    gameboy_pointer: number,
    width: number,
    height: number,
    pixelSize: number
}

interface ScreenState {
    wasm: RustGameboy,
    width: number,
    height: number,
    bytesPerRow: number,
    bytesPerColumn: number
}

class Screen extends React.Component<ScreenProps, ScreenState> {
    private canvas: any;
    private interval_id: number;

    async componentDidMount() {
        const wasm = await loadWasm();
        this.setState({
          wasm
        }, () => console.log('Loaded WASM'));
    }

    componentDidUpdate() {
        if (!!this.props.gameboy_pointer) {
            console.log('Loaded ROM');
            this.interval_id = window.setInterval(() => window.requestAnimationFrame(this.updateCanvas), 16);
        }
    }

    componentWillUnmount() {
        if (this.interval_id)
            window.clearInterval(this.interval_id);
    }

    constructor(props: ScreenProps) {
        super(props);

        this.canvas = null;
        this.interval_id = 0;
        this.setCanvasRef = this.setCanvasRef.bind(this);
        this.updateCanvas = this.updateCanvas.bind(this);

        let bytesPerColumn = props.pixelSize * 4; 
        let bytesPerRow = bytesPerColumn * props.width;
        this.state = {
            wasm: null,
            width: props.width * props.pixelSize,
            height: props.height * props.pixelSize,
            bytesPerRow,
            bytesPerColumn
        };
    }

    render() {
        return (
            <canvas
                className={cs(this.props.className, 'gameboy-screen')}
                ref={this.setCanvasRef}
                width={this.props.width * this.props.pixelSize}
                height={this.props.height * this.props.pixelSize} 
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
        const imageData = ctx.createImageData(this.state.width, this.state.height);
        const data = imageData.data;
        for (let i = 0; i < chunked.length; i++)
        {
            let rgb = chunked[i];
            let x = i % this.props.width;
            let y = Math.floor(i / this.props.width);
            let yOffset = y * this.state.bytesPerRow * this.props.pixelSize;
            for (let rowNum = 0; rowNum < this.props.pixelSize; rowNum++) {
                let rowOffset = yOffset + (rowNum * this.state.bytesPerRow);
                let xOffset = x * this.state.bytesPerColumn;

                for (let colNum = 0; colNum < this.props.pixelSize; colNum++) {
                    let colOffset = xOffset + (colNum * 4);
                    let offset = rowOffset + colOffset;
                    let color = 0;
                    while (color < rgb.length) {
                        data[offset + color] = rgb[color];
                        color++;
                    }
                    
                    data[offset + color] = 255;
                }
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }
}

export default Screen;