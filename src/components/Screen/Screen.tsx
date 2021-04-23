import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import chunk from 'chunk';
import { loadWasm } from '../../helpers/wasm';
import { setRustGameboy } from '../../redux/actions/rustGameboy';
import { State } from '../../redux/state/state';
import { RustGameboy } from '../../redux/state/rustGameboy';
import { mediaMinMd } from '../../constants/screenSizes';

type Props = OwnProps & StateProps & DispatchProps; 

interface OwnProps {
    className?: string,
    gameboy_pointer: number,
    width: number,
    height: number,
    pixelSize: number
}

interface StateProps {
    rustGameboy: RustGameboy
}

interface DispatchProps {
    setRustGameboy(rustGameboy: RustGameboy): void;
}

interface ScreenState {
    width: number,
    height: number,
    bytesPerRow: number,
    bytesPerColumn: number
}

const GameboyScreenFlex = styled.div`
    display: flex;
    justify-content: center; 
`;

const StyledCanvas = styled.canvas`
    border: 1px solid #000000;
    margin: 20px 20px 0px;
    width: 320px;

    @media only screen and (min-width: ${mediaMinMd}px) {
        width: 500px;
    }
`;

class Screen extends React.Component<Props, ScreenState> {
    private canvas: any;
    private request_id: number;

    async componentDidMount() {
        const wasm = await loadWasm();
        this.props.setRustGameboy(wasm);
        this.animate();
        console.log("Loaded WASM");
    }

    componentWillUnmount() {
        if (this.request_id) {
            cancelAnimationFrame(this.request_id);
        }
    }

    constructor(props: Props) {
        super(props);

        this.canvas = null;
        this.request_id = 0;

        let bytesPerColumn = props.pixelSize * 4; 
        let bytesPerRow = bytesPerColumn * props.width;
        this.state = {
            width: props.width * props.pixelSize,
            height: props.height * props.pixelSize,
            bytesPerRow,
            bytesPerColumn
        };
    }

    render() {
        return (
            <GameboyScreenFlex>
                <StyledCanvas
                    ref={this.setCanvasRef}
                    width={this.props.width * this.props.pixelSize}
                    height={this.props.height * this.props.pixelSize} 
                />
            </GameboyScreenFlex>
        );
    }

    animate = () => {
        this.request_id = requestAnimationFrame(this.animate);
        this.updateCanvas();
    }

    setCanvasRef = (element: any) => {
        if (!element)
            return;
        this.canvas = element;
    }

    updateCanvas = () => {
        if (!this.canAnimate())
            return;

        const frame = this.props.rustGameboy.clock_frame(this.props.gameboy_pointer);
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

    canAnimate = () => {
        return !!this.canvas && !!this.props.gameboy_pointer && !!this.props.rustGameboy.clock_frame;
    }
}

const mapStateToProps = (state: State): StateProps => {
    return {
        rustGameboy: state.rustGameboy
    };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    setRustGameboy: (rustGameboy: RustGameboy) => dispatch(setRustGameboy(rustGameboy))
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);