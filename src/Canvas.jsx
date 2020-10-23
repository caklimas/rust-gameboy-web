import React from 'react';
import './Canvas.css';

class Canvas extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }

    constructor(props) {
        super(props);
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 100, 100);
    }

    render() {
        return (
            <canvas className="gameboy" ref="canvas" width={this.props.width} height={this.props.height}/>
        );
    }
}

export default Canvas;